import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { UserEducationItem } from "@/types/userEducation";

// ✅ CREATE
export async function createUserEducations(formData: FormData) {
  try {
    const res = await api.post<ApiResponse<{ insertedCount: number }>>("/user-educations", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal membuat riwayat pendidikan"),
    };
  }
}

// ✅ GET ALL
export async function getUserEducationsAll() {
  try {
    const res = await api.get<ApiResponse<UserEducationItem[]>>("/user-educations");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil semua riwayat pendidikan"),
    };
  }
}

// ✅ GET BY ID
export async function getUserEducationById(user_education_id: number) {
  try {
    const res = await api.get<ApiResponse<UserEducationItem>>(`/user-educations/${user_education_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil detail riwayat pendidikan"),
    };
  }
}

// ✅ UPDATE BY ID
export async function updateUserEducationById(user_education_id: number, formData: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/user-educations/${user_education_id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal memperbarui riwayat pendidikan"),
    };
  }
}

// ✅ DELETE BY ID
export async function deleteUserEducationById(user_education_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/user-educations/${user_education_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menghapus riwayat pendidikan"),
    };
  }
}

// ✅ GET BY USERNAME
export async function getUserEducationsByUsername(username: string) {
  try {
    const res = await api.get<ApiResponse<UserEducationItem[]>>(`/user-educations/username/${username}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil riwayat pendidikan berdasarkan username"),
    };
  }
}

// ✅ DELETE BY USERNAME
export async function deleteUserEducationsByUsername(username: string) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/user-educations/username/${username}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menghapus riwayat pendidikan berdasarkan username"),
    };
  }
}

// ✅ UPDATE BY USERNAME
export async function updateUserEducationsByUsername(username: string, formData: FormData) {
  try {
    const res = await api.put<ApiResponse<{ insertedCount: number }>>(`/user-educations/username/${username}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal memperbarui riwayat pendidikan berdasarkan username"),
    };
  }
}
