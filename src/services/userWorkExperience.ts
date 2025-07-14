import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { UserWorkExperienceItem } from "@/types/userWorkExperience";
import type { ApiResponse } from "@/utils/responseController";

// ✅ CREATE
export async function createUserWorkExperience(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<UserWorkExperienceItem>>("/user-work-experiences", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menambahkan pengalaman kerja"),
    };
  }
}

// ✅ GET ALL
export async function getAllUserWorkExperiences() {
  try {
    const res = await api.get<ApiResponse<UserWorkExperienceItem[]>>("/user-work-experiences");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil semua data pengalaman kerja"),
    };
  }
}

// ✅ GET BY ID
export async function getUserWorkExperienceById(user_work_experience_id: number) {
  try {
    const res = await api.get<ApiResponse<UserWorkExperienceItem>>(`/user-work-experiences/${user_work_experience_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil data pengalaman kerja berdasarkan ID"),
    };
  }
}

// ✅ UPDATE BY ID
export async function updateUserWorkExperienceById(user_work_experience_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/user-work-experiences/${user_work_experience_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengubah pengalaman kerja"),
    };
  }
}

// ✅ DELETE BY ID
export async function deleteUserWorkExperienceById(user_work_experience_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/user-work-experiences/${user_work_experience_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menghapus data pengalaman kerja"),
    };
  }
}
