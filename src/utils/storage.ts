export function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;

  if (sessionStorage.getItem("user")) return sessionStorage;
  if (localStorage.getItem("user")) return localStorage;

  return null;
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
