const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default async function fetchClient(endpoint, { auth = true, headers, ...options } = {}) {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : null;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  return response.json();
}