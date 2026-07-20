import { clearSession, getToken } from "./tokenStorage";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:10000").replace(/\/$/, "");

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type RequestOptions = {
  auth?: boolean;
  body?: unknown;
};

function friendlyError(status: number, fallback: string) {
  if (status === 400) return fallback || "Please check the form values and try again.";
  if (status === 401) return "Your session expired. Please log in again.";
  if (status === 403) return "You do not have permission to perform this action.";
  if (status === 404) return "The requested information was not found.";
  if (status >= 500) return "The server had trouble completing the request. Please try again.";
  return fallback || "Something went wrong. Please try again.";
}

export async function apiRequest<T>(path: string, method = "GET", options: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {};

  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (options.auth !== false) {
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });
  } catch {
    throw new ApiError(0, "Could not connect to the backend. Please make sure it is running.");
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const detail = typeof data?.detail === "string" ? data.detail : "";
    if (response.status === 401) clearSession();
    throw new ApiError(response.status, friendlyError(response.status, detail));
  }

  return data as T;
}
