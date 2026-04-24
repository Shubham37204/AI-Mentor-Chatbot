from collections.abc import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession
from langchain_groq import ChatGroq
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from app.core.config import get_settings
from app.models.message import RoleEnum
from app.prompts.system_prompt import DSA_COACH_SYSTEM_PROMPT
from app.services.chat_service import get_recent_messages, save_message
import uuid

settings = get_settings()


def _get_llm() -> ChatGroq:
    return ChatGroq(
        model="llama-3.3-70b-versatile",
        api_key=settings.GROQ_API_KEY,
        streaming=True,
        temperature=0.7,
    )


def _build_messages(history, new_message: str) -> list:
    messages = [SystemMessage(content=DSA_COACH_SYSTEM_PROMPT)]
    for msg in history:
        if msg.role == RoleEnum.user:
            messages.append(HumanMessage(content=msg.content))
        else:
            messages.append(AIMessage(content=msg.content))
    messages.append(HumanMessage(content=new_message))
    return messages


async def stream_response(
    session_id: uuid.UUID,
    user_message: str,
    db: AsyncSession,
) -> AsyncGenerator[str, None]:
    history = await get_recent_messages(session_id, db)
    lc_messages = _build_messages(history, user_message)
    llm = _get_llm()
    full_response = ""

    async for chunk in llm.astream(lc_messages):
        token = chunk.content or ""
        if token:
            full_response += token
            yield f"data: {token}\n\n"

    # Persist both messages after stream completes
    await save_message(session_id, RoleEnum.user, user_message, db)
    await save_message(session_id, RoleEnum.assistant, full_response, db)
    yield "data: [DONE]\n\n"

    