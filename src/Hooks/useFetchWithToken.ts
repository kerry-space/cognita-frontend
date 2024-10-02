import { useState } from 'react';
import {
  addTokenToRequestInit,
  CustomError,
  hasTokenExpired,
  ITokens,
  RefreshTokenError,
  refreshTokens,
  TOKENS,
} from '../utils';
import { useLocalStorage } from 'usehooks-ts';

interface IUseFetchWithTokenReturn<T> {
  error: CustomError | null;
  isLoading: boolean;
  requestFunc: () => Promise<T | void>;
}

export function useFetchWithToken<T>(
  url: RequestInfo | URL,
  options?: RequestInit
): IUseFetchWithTokenReturn<T> {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tokens, setTokens, clearTokens] = useLocalStorage<ITokens | null>(
    TOKENS,
    null
  );
  const [error, setError] = useState<CustomError | null>(null);

  // This function is generated based on the parameters to the useFetchWithToken and it's used internally by the requestFunc.
  async function generatedFetch<T>(accessToken: string): Promise<T> {
    const requestInit: RequestInit = addTokenToRequestInit(
      accessToken,
      options
    );
    const response: Response = await fetch(url, requestInit);

    if (response.ok === false) {
      throw new CustomError(response.status, response.statusText);
    }

    return (await response.json()) as T;
  }

  async function requestFunc() {
    setError(null);
    setIsLoading(true);

    const tokenIsExpired: boolean = hasTokenExpired(tokens!.accessToken);

    if (tokenIsExpired) {
      // Ask api to refresh token before fetching the data.
      console.log('Token is expired:', tokenIsExpired);
      try {
        const refreshedTokens = await refreshTokens(tokens!);
        setTokens(refreshedTokens);
        const data = await generatedFetch<T>(refreshedTokens.accessToken);
        return data;
      } catch (error) {
        if (error instanceof RefreshTokenError) {
          console.log(error);
          clearTokens();
        }
        if (error instanceof CustomError) {
          setError(error);
          if (error.errorCode === 401) {
            clearTokens();
          }
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      // Just fetch the data right away
      try {
        const data = await generatedFetch<T>(tokens!.accessToken);
        return data;
      } catch (error) {
        if (error instanceof CustomError) {
          setError(error);
          if (error.errorCode === 401) {
            clearTokens();
          }
        }
      } finally {
        setIsLoading(false);
      }
    }
  }

  return { isLoading, error, requestFunc };
}
