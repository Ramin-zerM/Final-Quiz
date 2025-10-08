import AsyncStorage from "@react-native-async-storage/async-storage";

const isWeb = typeof window !== "undefined";
const API_KEY =
  "4c7195cc17c75a7affdcba7e0c77152b56d0771a74640b95212ccf0e83a83d66";
const REAL_BASE = "https://cis.kku.ac.th/api/classroom";
const PROXY_PREFIX = "https://api.allorigins.win/raw?url=";

const API_BASE = isWeb ? `${PROXY_PREFIX}${REAL_BASE}` : REAL_BASE;

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await AsyncStorage.getItem("userToken");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const text = await res.text();
  let data: any = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = text;
  }

  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export const AuthAPI = {
  login: (email: string, password: string) =>
    apiFetch<{ token: string }>("/classroom/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  profile: () => apiFetch("/profile"),
};

export const MembersAPI = {
  getByYear: (year: string) => apiFetch(`/class/${year}`),
};

export const PostsAPI = {
  list: () => apiFetch("/posts"),
  create: (content: string) =>
    apiFetch("/posts/create", {
      method: "POST",
      body: JSON.stringify({ content }),
    }),
  like: (postId: string) =>
    apiFetch("/posts/like", {
      method: "POST",
      body: JSON.stringify({ postId }),
    }),
  unlike: (postId: string) =>
    apiFetch("/posts/unlike", {
      method: "POST",
      body: JSON.stringify({ postId }),
    }),
  comment: (postId: string, content: string) =>
    apiFetch("/posts/comment", {
      method: "POST",
      body: JSON.stringify({ postId, content }),
    }),
};
