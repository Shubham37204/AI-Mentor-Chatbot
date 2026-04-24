export interface User {
  id: string
  email: string
  username: string
}

export interface Session {
  id: string
  user_id: string
  topic: string
  title: string
  created_at: string
}

export interface Message {
  id: string
  session_id: string
  role: "user" | "assistant"
  content: string
  created_at: string
}

export interface ChatHistory {
  session: Session
  messages: Message[]
}

export interface TokenResponse {
  access_token: string
  token_type: string
}
