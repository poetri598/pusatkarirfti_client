import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { UserPlatformItem } from "@/types/userPlatform";

// ✅ CREATE
export async function createUserPlatforms(formData: FormData) {
  try {
    const res = await api.post<ApiResponse<{ insertedIds: number[] }>>("/user-platforms", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal membuat data akun sosial media"),
    };
  }
}

// ✅ GET ALL
export async function getUserPlatformsAll() {
  try {
    const res = await api.get<ApiResponse<UserPlatformItem[]>>("/user-platforms");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil semua data akun sosial media"),
    };
  }
}

// ✅ GET BY ID
export async function getUserPlatformById(user_platform_id: number) {
  try {
    const res = await api.get<ApiResponse<UserPlatformItem>>(`/user-platforms/${user_platform_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil detail akun sosial media"),
    };
  }
}

// ✅ UPDATE BY ID
export async function updateUserPlatformById(user_platform_id: number, formData: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/user-platforms/${user_platform_id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal memperbarui data akun sosial media"),
    };
  }
}

// ✅ DELETE BY ID
export async function deleteUserPlatformById(user_platform_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/user-platforms/${user_platform_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menghapus data akun sosial media"),
    };
  }
}

// ✅ GET BY USERNAME
export async function getUserPlatformsByUsername(username: string) {
  try {
    const res = await api.get<ApiResponse<UserPlatformItem[]>>(`/user-platforms/username/${username}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil data akun sosial media berdasarkan username"),
    };
  }
}

// ✅ DELETE BY USERNAME
export async function deleteUserPlatformsByUsername(username: string) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/user-platforms/username/${username}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menghapus data akun sosial media berdasarkan username"),
    };
  }
}

// ✅ UPDATE BY USERNAME
export async function updateUserPlatformsByUsername(username: string, formData: FormData) {
  try {
    const res = await api.put<ApiResponse<{ insertedIds: number[] }>>(`/user-platforms/username/${username}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal memperbarui data akun sosial media berdasarkan username"),
    };
  }
}
