export interface IAuthContext {
  isLoggedIn: boolean;
  login: (creds: ILoginCredentials) => Promise<void>;
  logout: () => void;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginCredentials {
  userName: string;
  password: string;
}

export interface IUser {
  id: number;
  courseId: number;
  role: 0 | 1;
  email: string;
  courseName: string;
  name: string;
}

export interface IUserForm {
  id?: number;
  name?: string;
  password?: string;
  email?: string;
  courseId?: string;
  role?: number;
}
