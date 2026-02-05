export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  
  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json()
    : await res.text();

  if (!res.ok) {
    const msg = typeof data === "string" ? data : (data?.message || "Hiba történt");
    throw new Error(msg);
  }

  return data;
}