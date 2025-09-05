import { api } from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
  message: string;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/login', { email, password });
    return response.data;
  },

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/register', {
      name,
      email,
      password,
      password_confirmation: password
    });
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/logout');
  },

  async getProfile(token: string) {
    const response = await api.get('/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.user;
  }
};
