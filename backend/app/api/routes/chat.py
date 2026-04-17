from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse

from app.schemas.chat import (
    SessionCreateRequest,
    ChatRequest,
)
from app.services.chat_service import (
    create_session,
    get_user_sessions,
    get_session_history,
)
from app.services.ai_service import stream_response


router = APIRouter()

# Mock DB + auth
db = {"sessions": [], "messages": []}


def get_current_user():
    return {"id": "user-123"}


@router.post("/sessions")
def create_chat_session(payload: SessionCreateRequest, user=Depends(get_current_user)):
    return create_session(user["id"], payload.topic, payload.title, db)


@router.get("/sessions")
def list_sessions(user=Depends(get_current_user)):
    return get_user_sessions(user["id"], db)


@router.get("/sessions/{session_id}")
def get_history(session_id: str, user=Depends(get_current_user)):
    return get_session_history(session_id, user["id"], db)


@router.post("/chat/stream")
def chat_stream(payload: ChatRequest, user=Depends(get_current_user)):
    generator = stream_response(payload.session_id, payload.message, db)
    return StreamingResponse(generator, media_type="text/event-stream")