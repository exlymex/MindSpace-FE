export type AuthUser = {
  id: number;
  email: string;
  role: 'student' | 'psychologist';
  first_name: string;
  last_name: string;
  isAnonymous: boolean;
};

export type AuthState = {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
};

export interface LoginRequestData {
  email: string;
  password: string;
}

export interface RegisterRequestData {
  email: string;
  password: string;
  role: 'student' | 'psychologist';
  first_name: string;
  last_name: string;
  phone_number: string;
  birth_date: Date | string;
  // Додаткові поля для психологів
  education?: string;
  specialization?: string;
  license_number?: string;
  experience_years?: number;
}

export interface RegisterFormData extends RegisterRequestData {
  confirmPassword: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface UserResponse {
  id: number;
  email: string;
  role: 'student' | 'psychologist';
  first_name: string;
  last_name: string;
  bio: string | null;
  avatar_url: string | null;
  birth_date: string;
  phone_number: string;
  is_active: boolean;
  created_at: string;
  // Додаткові поля для психологів
  education?: string | null;
  specialization?: string | null;
  license_number?: string | null;
  experience_years?: number | null;
}

export interface User {
  id: number;
  email: string;
  role: 'student' | 'psychologist';
  first_name: string;
  last_name: string;
  bio: string | null;
  avatar_url: string | null;
  birth_date: string;
  phone_number: string;
  is_active: boolean;
  created_at: string;
  // Додаткові поля для психологів
  education?: string | null;
  specialization?: string | null;
  license_number?: string | null;
  experience_years?: number | null;
}

export interface UserUpdate {
  first_name?: string;
  last_name?: string;
  bio?: string;
  avatar_url?: string;
  birth_date?: string;
  phone_number?: string;
  // Додаткові поля для психологів
  education?: string;
  specialization?: string;
  license_number?: string;
  experience_years?: number;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: UserResponse;
}
