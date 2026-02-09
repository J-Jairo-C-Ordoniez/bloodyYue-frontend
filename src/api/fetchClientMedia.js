import useAuthStore from "../store/auth.store";
import useErrorTokenStore from "../store/errorToken.store";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bloodyyue-backend.onrender.com/api';

export default async function fetchClientMedia(endpoint, { auth = true, headers, options } = {}) {
  const token = useAuthStore.getState().token;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: options?.method || 'GET',
      credentials: 'include',
      headers: {
        ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: options?.body,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.status === 401 && auth) {
      useErrorTokenStore.getState().setErrorToken(true);
      return {
        error: true,
        status: 401,
        message: 'Sesión expirada'
      };
    }

    if (!response.ok) {
      return {
        error: true,
        status: response.status,
        message: response.statusText
      }
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    return {
      error: true,
      status: error.name === 'AbortError' ? 'TIMEOUT' : 'NETWORK_ERROR',
      message: error.message
    };
  }
}