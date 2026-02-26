import { FetchError, FetchOptions } from "../model/types/api";

export async function createFetchInstance<TResponse = unknown, TBody = unknown>({
  url,
  method = "GET",
  body,
  jwt,
  headers: customHeaders = {},
}: FetchOptions<TBody>): Promise<TResponse> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  if (jwt) {
    headers["Authorization"] = `Bearer ${jwt}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body && method !== "GET") {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const error = new Error() as FetchError;
      error.status = response.status;
      error.message = `Ошибка запроса: ${response.statusText}`;

      throw error;
    }

    const data = await response.json();
    return data as TResponse;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Неизвестная ошибка при выполнении запроса");
  }
}

