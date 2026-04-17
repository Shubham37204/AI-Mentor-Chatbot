from uuid import uuid4
from datetime import datetime
from uuid import UUID

def create_session(user_id, topic, title, db):
    session = {
        "id": uuid4(),
        "user_id": user_id,
        "topic": topic,
        "title": title,
        "created_at": datetime.utcnow(),
    }
    db["sessions"].append(session)
    return session


def get_user_sessions(user_id, db):
    return [s for s in db["sessions"] if s["user_id"] == user_id]


def get_session_history(session_id, user_id, db):

    if isinstance(session_id, str):
        session_id = UUID(session_id)

    session = next(
        (s for s in db["sessions"] if s["id"] == session_id and s["user_id"] == user_id),
        None,
    )
    if not session:
        raise ValueError("Session not found or unauthorized")

    messages = [m for m in db["messages"] if m["session_id"] == session_id]
    messages.sort(key=lambda x: x["created_at"])

    return {"session": session, "messages": messages}


def save_message(session_id, role, content, db):
    message = {
        "id": uuid4(),
        "session_id": session_id,
        "role": role,
        "content": content,
        "created_at": datetime.utcnow(),
    }
    db["messages"].append(message)
    return message