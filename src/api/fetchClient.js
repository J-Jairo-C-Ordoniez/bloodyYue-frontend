import useAuthStore from "../store/auth.store";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const newToken = async () => {
  const response = await fetch  (`${BASE_URL}/auth/refreshToken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  });

  return response.json();
}

export default async function fetchClient(endpoint, { auth = true, headers, options } = {}) {
  const token = useAuthStore.getState().token;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: options?.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: options?.body,
  });

  return response.json();
}