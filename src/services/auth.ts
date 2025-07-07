import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { UserItem } from "@/types/user";
import type { ApiResponse } from "@/utils/responseController";

interface LoginData {
  access_token: string;
  user: UserItem;
}

// ✅ LOGIN SERVICE
export async function loginService(user_name: string, user_password: string): Promise<{ success: true; access_token: string; user: UserItem } | { success: false; error: string }> {
  try {
    const res = await api.post<ApiResponse<LoginData>>("/auth/login", {
      user_name,
      user_password,
    });

    if (res.data.status === "success") {
      const { access_token, user } = res.data.data;
      return { success: true, access_token, user };
    }

    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Login gagal") };
  }
}

// ✅ REFRESH TOKEN
export async function refreshAccessToken(): Promise<{ success: true; access_token: string } | { success: false; error: string }> {
  try {
    const res = await api.post<ApiResponse<{ access_token: string }>>("/auth/refresh");
    if (res.data.status === "success") {
      return { success: true, access_token: res.data.data.access_token };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal memperbarui token"),
    };
  }
}

// ✅ LOGOUT SERVICE
export async function logoutService(): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const res = await api.post<ApiResponse<null>>("/auth/logout");
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Logout gagal"),
    };
  }
}
