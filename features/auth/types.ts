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
