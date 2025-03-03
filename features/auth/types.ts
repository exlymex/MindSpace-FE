export type AuthUser = {
  id: string;
  email?: string;
  isAnonymous: boolean;
};

export type AuthState = {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
};

export type RegisterFormData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: 'student' | 'psychologist';
};

export type RegisterRequestData = Omit<RegisterFormData, 'confirmPassword'>;

export interface User {
    id: number;
    username: string;
    email: string;
    role: 'student' | 'psychologist';
    first_name: string | null;
    last_name: string | null;
    bio: string | null;
    avatar_url: string | null;
    birth_date: string | null;
    phone_number: string | null;
}

export interface UserUpdate {
    first_name?: string;
    last_name?: string;
    bio?: string;
    avatar_url?: string;
    birth_date?: string;
    phone_number?: string;
}
