const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
export const getToken = () => localStorage.getItem('shop_token');
export async function api(path, options = {}) {
  const headers = {'Content-Type':'application/json', ...(options.headers || {})};
  if (getToken()) headers.Authorization = `Bearer ${getToken()}`;
  const res = await fetch(`${BASE}${path}`, {...options, headers});
  const type = res.headers.get('content-type') || '';
  const data = type.includes('application/json') ? await res.json() : await res.text();
  if (!res.ok) throw new Error(data?.message || data?.error || `Request failed (${res.status})`);
  return data;
}
