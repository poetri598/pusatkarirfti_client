"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { loginService, logoutService } from "@/services/auth";
import { saveUserData, clearUserData, getStorage } from "@/utils/storage";
import { showErrorDialog } from "@/components/Custom/AlertButton";
import type { UserItem } from "@/types/user";

type AuthContextType = {
  user: UserItem | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (username: string, password: string, remember: boolean) => Promise<{ success: true } | { success: false; error: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserItem | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storage = getStorage();
    const token = storage?.getItem("access_token");
    const userData = storage?.getItem("user");
    if (token && userData) {
      setAccessToken(token);
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  // ✅ Auto logout jika pakai sessionStorage dan tab ditutup
  useEffect(() => {
    const isSessionLogin = !!sessionStorage.getItem("user");
    const handlePageHide = () => {
      if (isSessionLogin) {
        navigator.sendBeacon(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`);
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("user");
      }
    };
    window.addEventListener("pagehide", handlePageHide);
    return () => {
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, []);

  const login = async (username: string, password: string, remember: boolean): Promise<{ success: true } | { success: false; error: string }> => {
    const result = await loginService(username, password);
    if (result.success) {
      saveUserData(result.access_token, result.user, remember);
      setAccessToken(result.access_token);
      setUser(result.user);
      return { success: true };
    }
    return { success: false, error: result.error };
  };

  const logout = async (): Promise<void> => {
    const result = await logoutService();
    if (result.success) {
      clearUserData();
      setAccessToken(null);
      setUser(null);
    } else {
      await showErrorDialog(result.error);
    }
  };

  return <AuthContext.Provider value={{ user, accessToken, isLoading, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
