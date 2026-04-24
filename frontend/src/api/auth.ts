import apiClient from './client';
import { TokenResponse, User } from '../types';

export const register = async (email: string, username: string, password: string): Promise<TokenResponse> => {
  return apiClient.post('api/v1/auth/register', {
    json: { email, username, password }
  }).json();
};

export const login = async (email: string, password: string): Promise<TokenResponse> => {
  // Using form data as typically expected by OAuth2 password flow in FastAPI, unless json is preferred.
  // Assuming standard JSON based on typical implementations, but if form data is needed we can adjust.
  return apiClient.post('api/v1/auth/login', {
    json: { email, password }
  }).json();
};

export const getMe = async (): Promise<User> => {
  return apiClient.get('api/v1/auth/me').json();
};
