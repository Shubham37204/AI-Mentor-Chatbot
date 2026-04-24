from pydantic import BaseModel, field_validator
from uuid import UUID
from datetime import datetime
from app.models.message import RoleEnum

VALID_TOPICS = {
    "arrays", "strings", "linkedlist", "trees",
    "graphs", "dp", "sorting", "searching", "recursion"
}


class SessionCreateRequest(BaseModel):
    topic: str
    title: str | None = None

    @field_validator("topic")
    @classmethod
    def topic_must_be_valid(cls, v: str) -> str:
        if v.lower() not in VALID_TOPICS:
            raise ValueError(f"Topic must be one of: {sorted(VALID_TOPICS)}")
        return v.lower()


class ChatRequest(BaseModel):
    session_id: UUID
    message: str

    @field_validator("message")
    @classmethod
    def message_not_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Message cannot be empty.")
        if len(v) > 2000:
            raise ValueError("Message cannot exceed 2000 characters.")
        return v.strip()


class SessionResponse(BaseModel):
    id: UUID
    user_id: UUID
    topic: str
    title: str
    created_at: datetime

    model_config = {"from_attributes": True}


class MessageResponse(BaseModel):
    id: UUID
    session_id: UUID
    role: RoleEnum
    content: str
    created_at: datetime

    model_config = {"from_attributes": True}


class ChatHistoryResponse(BaseModel):
    session: SessionResponse
    messages: list[MessageResponse]

    