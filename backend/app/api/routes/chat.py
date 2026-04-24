import uuid
from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_db, get_current_user
from app.models.user import User
from app.schemas.chat import (
    SessionCreateRequest,
    SessionResponse,
    ChatRequest,
    ChatHistoryResponse,
)
from app.services.chat_service import (
    create_session,
    get_user_sessions,
    get_session_history,
)
from app.services.ai_service import stream_response

router = APIRouter()


@router.post("/sessions", response_model=SessionResponse)
async def create_chat_session(
    payload: SessionCreateRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await create_session(current_user.id, payload.topic, payload.title, db)


@router.get("/sessions", response_model=list[SessionResponse])
async def list_sessions(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await get_user_sessions(current_user.id, db)


@router.get("/sessions/{session_id}", response_model=ChatHistoryResponse)
async def get_history(
    session_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await get_session_history(session_id, current_user.id, db)


@router.post("/chat/stream")
async def chat_stream(
    payload: ChatRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return StreamingResponse(
        stream_response(payload.session_id, payload.message, db),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )

    