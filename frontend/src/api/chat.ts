import apiClient from './client';
import { Session, ChatHistory } from '../types';

export const createSession = async (topic: string, title?: string): Promise<Session> => {
  const response = await apiClient.post('api/v1/sessions', {
    json: { topic, title: title || `Practice: ${topic}` },
  }).json<Session>();
  return response;
};

export const getSessions = async (): Promise<Session[]> => {
  const response = await apiClient.get('api/v1/sessions').json<Session[]>();
  return response;
};

export const getHistory = async (sessionId: string): Promise<ChatHistory> => {
  const response = await apiClient.get(`api/v1/sessions/${sessionId}`).json<ChatHistory>();
  return response;
};
