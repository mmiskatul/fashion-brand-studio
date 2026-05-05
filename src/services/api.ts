// API-ready service layer. Replace these with real fetch calls later.
const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

export async function mockGet<T>(data: T, ms?: number): Promise<T> {
  await delay(ms);
  return data;
}

export async function mockPost<T>(data: T, ms?: number): Promise<{ success: true; data: T }> {
  await delay(ms);
  return { success: true, data };
}

// Future: const API_BASE = import.meta.env.VITE_API_BASE_URL;
// export async function apiGet(path) { return fetch(`${API_BASE}${path}`).then(r => r.json()); }
