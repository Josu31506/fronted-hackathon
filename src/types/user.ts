export type UserRole = 'estudiante' | 'staff' | 'autoridad';

export interface User {
  id: string;
  name: string;
  role: UserRole;
}
