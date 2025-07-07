// utils/storage.ts
export function getStorage() {
  if (typeof window === "undefined") return null;

  return localStorage.getItem("user") ? localStorage : sessionStorage.getItem("user") ? sessionStorage : null;
}

export function saveUserData(access_token: string, user: any, remember: boolean) {
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem("access_token", access_token);
  storage.setItem("user", JSON.stringify(user));
}

export function clearUserData() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("user");
}
