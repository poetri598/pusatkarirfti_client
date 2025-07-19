import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { UserAchievementItem } from "@/types/userAchievement";

// ✅ CREATE
export async function createUserAchievements(formData: FormData) {
  try {
    const res = await api.post<ApiResponse<{ insertedIds: number[] }>>("/user-achievements", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal membuat data penghargaan"),
    };
  }
}

// ✅ GET ALL
export async function getUserAchievementsAll() {
  try {
    const res = await api.get<ApiResponse<UserAchievementItem[]>>("/user-achievements");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil semua data penghargaan"),
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
      error: extractErrorMessage(err, "Gagal mengambil detail penghargaan"),
    };
  }
}

// ✅ UPDATE BY ID
export async function updateUserAchievementById(user_achievement_id: number, formData: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/user-achievements/${user_achievement_id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal memperbarui data penghargaan"),
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
      error: extractErrorMessage(err, "Gagal menghapus data penghargaan"),
    };
  }
}

// ✅ GET BY USERNAME
export async function getUserAchievementsByUsername(username: string) {
  try {
    const res = await api.get<ApiResponse<UserAchievementItem[]>>(`/user-achievements/username/${username}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil data penghargaan berdasarkan username"),
    };
  }
}

// ✅ DELETE BY USERNAME
export async function deleteUserAchievementsByUsername(username: string) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/user-achievements/username/${username}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menghapus data penghargaan berdasarkan username"),
    };
  }
}

// ✅ UPDATE BY USERNAME
export async function updateUserAchievementsByUsername(username: string, formData: FormData) {
  try {
    const res = await api.put<ApiResponse<{ insertedIds: number[] }>>(`/user-achievements/username/${username}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal memperbarui data penghargaan berdasarkan username"),
    };
  }
}
