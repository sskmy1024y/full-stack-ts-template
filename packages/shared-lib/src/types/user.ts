export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreate {
  email: string;
  name: string;
  password: string;
}

export interface UserUpdate {
  name?: string;
  email?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}
