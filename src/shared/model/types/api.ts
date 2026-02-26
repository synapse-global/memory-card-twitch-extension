export type FetchMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type FetchOptions<TBody = unknown> = {
  url: string;
  method?: FetchMethod;
  body?: TBody;
  jwt?: string | null;
  headers?: Record<string, string>;
};

export type FetchError = Error & {
  status?: number;
  data?: unknown;
};

export type CombinedResponse = {
  mainIcon: string;
  about: {
    content: string;
  };
  is_open?: boolean;
};