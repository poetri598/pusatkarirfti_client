import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { UserWorkExperienceItem } from "@/types/userWorkExperience";

// ✅ CREATE
export async function createWorkExperiences(formData: FormData) {
  try {
    const res = await api.post<ApiResponse<{ insertedCount: number }>>("/work-experiences", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal membuat pengalaman kerja"),
    };
  }
}

// ✅ GET ALL
export async function getWorkExperiencesAll() {
  try {
    const res = await api.get<ApiResponse<UserWorkExperienceItem[]>>("/work-experiences");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil pengalaman kerja"),
    };
  }
}

// ✅ GET BY ID
export async function getWorkExperienceById(user_work_experience_id: number) {
  try {
    const res = await api.get<ApiResponse<UserWorkExperienceItem>>(`/work-experiences/${user_work_experience_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil detail pengalaman kerja"),
    };
  }
}

// ✅ UPDATE BY ID
export async function updateWorkExperienceById(user_work_experience_id: number, formData: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/work-experiences/${user_work_experience_id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal memperbarui pengalaman kerja"),
    };
  }
}

// ✅ DELETE BY ID
export async function deleteWorkExperienceById(user_work_experience_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/work-experiences/${user_work_experience_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menghapus pengalaman kerja"),
    };
  }
}

// ✅ GET BY USERNAME
export async function getWorkExperiencesByUsername(username: string) {
  try {
    const res = await api.get<ApiResponse<UserWorkExperienceItem[]>>(`/work-experiences/username/${username}`);

    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil pengalaman kerja berdasarkan username"),
    };
  }
}

// ✅ DELETE BY USERNAME
export async function deleteWorkExperiencesByUsername(username: string) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/work-experiences/username/${username}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menghapus pengalaman organisasi berdasarkan username"),
    };
  }
}

// ✅ UPDATE BY USERNAME (FormData dibuat di luar service)
export async function updateWorkExperiencesByUsername(username: string, formData: FormData) {
  try {
    const res = await api.put<ApiResponse<{ insertedCount: number }>>(`/work-experiences/username/${username}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal memperbarui pengalaman kerja berdasarkan username"),
    };
  }
}
