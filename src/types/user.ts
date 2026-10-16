export interface User {
  email: string;
  name?: string;
  password: string;
  role?: string;
  avatar?: string;
}

export interface AdminUser {
  id: number;
  email: string;
  name?: string;
  role?: string;
  avatar?: string;
  creationAt: string;
}
