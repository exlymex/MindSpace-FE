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
