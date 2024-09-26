import {
  BASE_URL,
  CustomError,
  ILoginCredentials,
  ITokens,
  RefreshTokenError,
} from '.';

export async function loginReq({
  userName,
  password,
}: ILoginCredentials): Promise<ITokens> {
  const url = `${BASE_URL}/authentication/login`;

  const response: Response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName, password }),
  });

  if (response.ok === false) {
    throw new CustomError(response.status, 'Could not login');
  }

  return (await response.json()) as ITokens;
}

export async function refreshTokens({
  accessToken,
  refreshToken,
}: ITokens): Promise<ITokens> {
  const url: string = `${BASE_URL}/authentication/refresh`;

  const response: Response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accessToken,
      refreshToken,
    }),
  });

  if (response.status === 400) {
    throw new RefreshTokenError(
      response.status,
      'Refreshtoken seem to have expired'
    );
  }
  if (!response.ok) {
    throw new CustomError(response.status, 'Refreshtoken seem to have expired');
  }

  return (await response.json()) as ITokens;
}
