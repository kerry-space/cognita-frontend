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
  role: 'Teacher' | 'Student';
  email: string;
  course: string;
  name: string;
}
