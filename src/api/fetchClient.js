'use client';

import useAuthStore from "../store/auth.store";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5000/api';

export default async function fetchClient(endpoint, { auth = true, headers, options } = {}) {
  const token = useAuthStore.getState().token;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: options?.method || 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: options?.body,
  });

  return response.json();
}