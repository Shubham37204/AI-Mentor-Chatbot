import pytest
from app.core.config import get_settings
from app.db.base import Base, engine


def test_settings_loaded():
    settings = get_settings()
    assert settings.DATABASE_URL is not None
    assert settings.SECRET_KEY is not None
    assert settings.GROQ_API_KEY is not None
    assert settings.ALGORITHM == "HS256"


def test_settings_cache():
    """get_settings() must return same instance (lru_cache)."""
    s1 = get_settings()
    s2 = get_settings()
    assert s1 is s2


@pytest.mark.asyncio
async def test_db_engine_connects():
    """Verify async engine can connect to Supabase."""
    async with engine.connect() as conn:
        assert conn is not None


@pytest.mark.asyncio
async def test_tables_exist_after_migration():
    """Verify all three tables are registered in metadata."""
    from app.models import User, ChatSession, Message  # noqa
    table_names = list(Base.metadata.tables.keys())
    assert "users" in table_names
    assert "chat_sessions" in table_names
    assert "messages" in table_names