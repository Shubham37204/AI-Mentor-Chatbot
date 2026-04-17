import os
from langchain_groq import ChatGroq
from app.prompts.system_prompt import DSA_COACH_SYSTEM_PROMPT

def get_llm():
    api_key = os.getenv("GROQ_API_KEY")

    # ✅ If no API key → return mock behavior
    if not api_key:
        return None

    return ChatGroq(
        model="llama-3.1-70b-versatile",
        streaming=True,
    )

def build_messages(history, new_message):
    messages = [{"role": "system", "content": DSA_COACH_SYSTEM_PROMPT}]

    for msg in history:
        messages.append({"role": msg["role"], "content": msg["content"]})

    messages.append({"role": "user", "content": new_message})

    return messages

async def stream_response(session_id, user_message, db):
    history = [
        m for m in db["messages"]
        if m["session_id"] == session_id
    ][-20:]

    messages = build_messages(history, user_message)

    llm = get_llm()

    full_response = ""

    if llm is None:
        mock_reply = "Mock response"
        yield f"data: {mock_reply}\n\n"

        from app.services.chat_service import save_message
        save_message(session_id, "user", user_message, db)
        save_message(session_id, "assistant", mock_reply, db)
        return

    async for chunk in llm.astream(messages):
        token = chunk.content or ""
        if token:
            full_response += token
            yield f"data: {token}\n\n"

    from app.services.chat_service import save_message
    save_message(session_id, "user", user_message, db)
    save_message(session_id, "assistant", full_response, db)