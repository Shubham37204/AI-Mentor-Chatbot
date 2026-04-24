import uuid
from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException, status
from app.models.session import ChatSession
from app.models.message import Message, RoleEnum


async def create_session(
    user_id: uuid.UUID,
    topic: str,
    title: str | None,
    db: AsyncSession,
) -> ChatSession:
    session = ChatSession(
        user_id=user_id,
        topic=topic,
        title=title or f"{topic.capitalize()} Session",
    )
    db.add(session)
    await db.flush()
    await db.refresh(session)
    return session


async def get_user_sessions(
    user_id: uuid.UUID,
    db: AsyncSession,
) -> list[ChatSession]:
    result = await db.execute(
        select(ChatSession)
        .where(ChatSession.user_id == user_id)
        .order_by(ChatSession.created_at.desc())
    )
    return list(result.scalars().all())


async def get_session_history(
    session_id: uuid.UUID,
    user_id: uuid.UUID,
    db: AsyncSession,
) -> dict:
    result = await db.execute(
        select(ChatSession).where(
            ChatSession.id == session_id,
            ChatSession.user_id == user_id,
        )
    )
    session = result.scalar_one_or_none()
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Session not found or access denied.",
        )

    msg_result = await db.execute(
        select(Message)
        .where(Message.session_id == session_id)
        .order_by(Message.created_at.asc())
    )
    messages = list(msg_result.scalars().all())
    return {"session": session, "messages": messages}


async def save_message(
    session_id: uuid.UUID,
    role: RoleEnum,
    content: str,
    db: AsyncSession,
) -> Message:
    message = Message(
        session_id=session_id,
        role=role,
        content=content,
    )
    db.add(message)
    await db.flush()
    await db.refresh(message)
    return message


async def get_recent_messages(
    session_id: uuid.UUID,
    db: AsyncSession,
    limit: int = 20,
) -> list[Message]:
    result = await db.execute(
        select(Message)
        .where(Message.session_id == session_id)
        .order_by(Message.created_at.desc())
        .limit(limit)
    )
    messages = list(result.scalars().all())
    return list(reversed(messages))

    