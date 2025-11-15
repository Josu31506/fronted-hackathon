import { User, UserRole } from '../types/user';

const STORAGE_KEY = 'alertautec_user';

type LoginPayload = {
  name: string;
  role: UserRole;
};

export const login = async ({ name, role }: LoginPayload) => {
  // TODO: Replace with axios.post('/auth/login', credentials)
  const user: User = {
    id: crypto.randomUUID(),
    name,
    role,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
};

export const logout = async () => {
  // TODO: Replace with axios.post('/auth/logout')
  localStorage.removeItem(STORAGE_KEY);
};

export const getCurrentUser = (): User | null => {
  // TODO: Replace with axios.get('/auth/me')
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch (error) {
    console.error('Failed to parse user from storage', error);
    return null;
  }
};
