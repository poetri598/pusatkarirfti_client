import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { UserEducationItem } from "@/types/userEducation";
import type { ApiResponse } from "@/utils/responseController";

// ✅ CREATE
export async function createUserEducation(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<UserEducationItem>>("/user-educations", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menambahkan riwayat pendidikan"),
    };
  }
}

// ✅ GET ALL
export async function getAllUserEducations() {
  try {
    const res = await api.get<ApiResponse<UserEducationItem[]>>("/user-educations");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil semua data pendidikan"),
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
      error: extractErrorMessage(err, "Gagal mengambil data pendidikan berdasarkan ID"),
    };
  }
}

// ✅ UPDATE BY ID
export async function updateUserEducationById(user_education_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/user-educations/${user_education_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengubah data pendidikan"),
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
      error: extractErrorMessage(err, "Gagal menghapus data pendidikan"),
    };
  }
}
