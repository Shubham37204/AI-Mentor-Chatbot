import { create } from 'zustand';
import { Session, Message } from '../types';

interface ChatState {
  sessions: Session[];
  currentSession: Session | null;
  messages: Message[];
  isStreaming: boolean;
  setSessions: (sessions: Session[]) => void;
  setCurrentSession: (session: Session | null) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  appendToLastMessage: (token: string) => void;
  setIsStreaming: (isStreaming: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  sessions: [],
  currentSession: null,
  messages: [],
  isStreaming: false,
  setSessions: (sessions) => set({ sessions }),
  setCurrentSession: (session) => set({ currentSession: session }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  appendToLastMessage: (token) =>
    set((state) => {
      const lastMessage = state.messages[state.messages.length - 1];
      if (lastMessage && lastMessage.role === 'assistant') {
        const updatedMessages = [...state.messages];
        updatedMessages[updatedMessages.length - 1] = {
          ...lastMessage,
          content: lastMessage.content + token,
        };
        return { messages: updatedMessages };
      }
      return state;
    }),
  setIsStreaming: (isStreaming) => set({ isStreaming }),
}));
