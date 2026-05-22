# 🎓 AI Mentor Chatbot

An intelligent DSA (Data Structures and Algorithms) coaching chatbot powered by Groq AI. This full-stack application provides real-time conversational assistance for interview preparation with streaming responses.

## ✨ Features

- 🤖 **AI-Powered Coaching**: Real-time responses using Groq API
- 💬 **Streaming Messages**: Live message streaming for better UX
- 🔐 **User Authentication**: Secure JWT-based authentication
- 📚 **Topic-Based Sessions**: Organize learning by DSA topics
- 🎨 **Modern UI**: Built with React, Tailwind CSS, and TypeScript
- 📱 **Responsive Design**: Works seamlessly on desktop and tablet devices
- 🗄️ **Persistent Storage**: SQLite database with async support
- 🔄 **Message History**: Access past conversations within each session

## 🏗️ Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database**: SQLite with SQLAlchemy ORM
- **Async**: AsyncIO with aiosqlite
- **API**: RESTful API with CORS support
- **AI**: Groq API integration
- **Auth**: JWT tokens with bcrypt hashing
- **Migrations**: Alembic

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: Custom components with Lucide Icons
- **HTTP Client**: Ky
- **Markdown**: React Markdown with Syntax Highlighting

## 📋 Prerequisites

- Python 3.12+
- Node.js 18+ and npm
- Groq API Key ([Get one here](https://console.groq.com))

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd AI-Mentor-Chatbot
```

### 2. Setup Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1  # On Windows

# Install dependencies
pip install -r requirements.txt

# Create .env file
# Add the following:
# DATABASE_URL=sqlite+aiosqlite:///./test.db
# SECRET_KEY=your-secret-key-here
# GROQ_API_KEY=your-groq-api-key
# ALGORITHM=HS256
# ACCESS_TOKEN_EXPIRE_MINUTES=30
# ENVIRONMENT=development

# Run migrations
alembic upgrade head

# Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at `http://localhost:8000`
API docs at `http://localhost:8000/docs`

### 3. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at `http://localhost:5173`

### 4. Run Both Concurrently

From the root directory:

```bash
npm run dev
```

## 📁 Project Structure

```
AI-Mentor-Chatbot/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── routes/       # API endpoints
│   │   │   └── deps.py       # Dependencies
│   │   ├── core/
│   │   │   ├── config.py     # Configuration
│   │   │   ├── security.py   # JWT & Auth
│   │   │   └── streaming.py  # Streaming logic
│   │   ├── db/
│   │   │   ├── base.py       # Database setup
│   │   │   └── session.py    # Session management
│   │   ├── models/           # SQLAlchemy models
│   │   ├── schemas/          # Pydantic schemas
│   │   ├── services/         # Business logic
│   │   ├── prompts/          # AI prompts
│   │   └── main.py           # FastAPI app
│   ├── alembic/              # Database migrations
│   ├── requirements.txt
│   └── pytest.ini
├── frontend/
│   ├── src/
│   │   ├── api/              # API calls
│   │   ├── components/       # React components
│   │   ├── hooks/            # Custom hooks
│   │   ├── pages/            # Page components
│   │   ├── store/            # Zustand stores
│   │   ├── types/            # TypeScript types
│   │   ├── lib/              # Utilities
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── .gitignore
├── .env.example
├── docker-compose.yml
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user

### Chat
- `POST /api/v1/chat/sessions` - Create new session
- `GET /api/v1/chat/sessions` - Get all sessions
- `GET /api/v1/chat/sessions/{session_id}` - Get session details
- `POST /api/v1/chat/stream` - Stream message response
- `GET /api/v1/chat/history/{session_id}` - Get message history

### Health
- `GET /health` - Health check endpoint

## 🔐 Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL=sqlite+aiosqlite:///./test.db

# JWT
SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Groq API
GROQ_API_KEY=your-groq-api-key-here

# App
ENVIRONMENT=development
```

## 📦 Dependencies

### Backend (requirements.txt)
- FastAPI - Web framework
- Uvicorn - ASGI server
- SQLAlchemy - ORM
- Pydantic - Data validation
- python-jose - JWT tokens
- passlib - Password hashing
- python-multipart - Form handling
- aiosqlite - Async SQLite
- alembic - Database migrations
- groq - Groq AI API

### Frontend (package.json)
- React - UI library
- TypeScript - Type safety
- Vite - Build tool
- Tailwind CSS - Styling
- Zustand - State management
- Ky - HTTP client
- React Router - Navigation
- React Markdown - Markdown rendering
- React Syntax Highlighter - Code highlighting

## 🧪 Running Tests

Backend tests:
```bash
cd backend
pytest
```

## 🐳 Docker Support

Build and run with Docker:
```bash
docker-compose up --build
```

## 📝 Available Scripts

### Root Level
```bash
npm run dev                    # Run both backend and frontend
npm run install:frontend       # Install frontend dependencies
npm run install:backend        # Install backend dependencies
```

### Backend
```bash
# From backend directory
uvicorn app.main:app --reload                    # Development server
alembic upgrade head                              # Run migrations
pytest                                            # Run tests
```

### Frontend
```bash
# From frontend directory
npm run dev                    # Development server
npm run build                  # Production build
npm run lint                   # Run ESLint
npm run preview               # Preview production build
```

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Shubham** - [GitHub](https://github.com/Shubham37204)

## 🙏 Acknowledgments

- [Groq](https://groq.com) - For the powerful AI API
- [FastAPI](https://fastapi.tiangolo.com) - For the amazing web framework
- [React](https://react.dev) - For the UI library
- [Tailwind CSS](https://tailwindcss.com) - For utility-first CSS

## 📞 Support

For support, email support@example.com or open an issue on the repository.

## 🎯 Roadmap

- [ ] Add LeetCode-style problem integration
- [ ] Real-time collaborative sessions
- [ ] Code execution environment
- [ ] Advanced analytics and progress tracking
- [ ] Mobile app (React Native)
- [ ] Voice-based interaction
- [ ] Multi-language support

---

Made with ❤️ for DSA enthusiasts
