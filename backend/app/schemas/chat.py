from pydantic import BaseModel, Field
from typing import Optional, List
from uuid import UUID
from datetime import datetime


class ChatRequest(BaseModel):
    session_id: Optional[UUID] = None
    message: str = Field(..., max_length=2000)


class SessionCreateRequest(BaseModel):
    topic: str
    title: Optional[str] = None


class SessionResponse(BaseModel):
    id: UUID
    user_id: UUID
    topic: str
    title: Optional[str]
    created_at: datetime


class MessageResponse(BaseModel):
    id: UUID
    session_id: UUID
    role: str
    content: str
    created_at: datetime


class ChatHistoryResponse(BaseModel):
    session: SessionResponse
    messages: List[MessageResponse]