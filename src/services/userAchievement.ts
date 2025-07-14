import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { UserAchievementItem } from "@/types/userAchievement";
import type { ApiResponse } from "@/utils/responseController";

// ✅ CREATE
export async function createUserAchievement(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<UserAchievementItem>>("/user-achievements", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menambahkan pencapaian"),
    };
  }
}

// ✅ GET ALL
export async function getAllUserAchievements() {
  try {
    const res = await api.get<ApiResponse<UserAchievementItem[]>>("/user-achievements");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil semua data pencapaian"),
    };
  }
}

// ✅ GET BY ID
export async function getUserAchievementById(user_achievement_id: number) {
  try {
    const res = await api.get<ApiResponse<UserAchievementItem>>(`/user-achievements/${user_achievement_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil data pencapaian berdasarkan ID"),
    };
  }
}

// ✅ UPDATE BY ID
export async function updateUserAchievementById(user_achievement_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/user-achievements/${user_achievement_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengubah data pencapaian"),
    };
  }
}

// ✅ DELETE BY ID
export async function deleteUserAchievementById(user_achievement_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/user-achievements/${user_achievement_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menghapus data pencapaian"),
    };
  }
}
