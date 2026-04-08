export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://staymaster.somee.com/api';

/**
 * Custom Error class to handle API errors consistently
 */
export class ApiError extends Error {
  public status: number;
  public data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

/**
 * Base API Client for making HTTP requests to the backend.
 * Handles automatic JSON parsing, error throwing, and Auth token injectons.
 */
export async function fetchClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  // Process headers
  const headers = new Headers(options.headers || {});
  
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // Inject Authorization token if running on client side (or manage via cookies if SSR)
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("access_token") || process.env.NEXT_PUBLIC_DEV_TOKEN;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    // Handle No Content response
    if (response.status === 204) {
      return {} as T;
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new ApiError(
        response.status,
        data?.message || response.statusText || 'An error occurred',
        data
      );
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Network or other unexpected errors
    throw new ApiError(500, error instanceof Error ? error.message : 'Unknown error');
  }
}
