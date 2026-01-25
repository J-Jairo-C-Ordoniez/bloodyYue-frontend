'use client';

import useAuthStore from "../store/auth.store";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5000/api';

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
    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    return {
      error: true,
      status: error.name === 'AbortError' ? 'TIMEOUT' : 'NETWORK_ERROR',
      body: error.message
    };
  }
}