import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { UserSkillItem } from "@/types/userSkill";

// ✅ CREATE
export async function createUserSkills(formData: FormData) {
  try {
    const res = await api.post<ApiResponse<{ insertedIds: number[] }>>("/user-skills", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal membuat data skill"),
    };
  }
}

// ✅ GET ALL
export async function getUserSkillsAll() {
  try {
    const res = await api.get<ApiResponse<UserSkillItem[]>>("/user-skills");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil semua data skill"),
    };
  }
}

// ✅ GET BY ID
export async function getUserSkillById(user_skill_id: number) {
  try {
    const res = await api.get<ApiResponse<UserSkillItem>>(`/user-skills/${user_skill_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil detail skill"),
    };
  }
}

// ✅ UPDATE BY ID
export async function updateUserSkillById(user_skill_id: number, formData: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/user-skills/${user_skill_id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal memperbarui data skill"),
    };
  }
}

// ✅ DELETE BY ID
export async function deleteUserSkillById(user_skill_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/user-skills/${user_skill_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menghapus data skill"),
    };
  }
}

// ✅ GET BY USERNAME
export async function getUserSkillsByUsername(username: string) {
  try {
    const res = await api.get<ApiResponse<UserSkillItem[]>>(`/user-skills/username/${username}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil data skill berdasarkan username"),
    };
  }
}

// ✅ DELETE BY USERNAME
export async function deleteUserSkillsByUsername(username: string) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/user-skills/username/${username}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menghapus data skill berdasarkan username"),
    };
  }
}

// ✅ UPDATE BY USERNAME
export async function updateUserSkillsByUsername(username: string, formData: FormData) {
  try {
    const res = await api.put<ApiResponse<{ insertedIds: number[] }>>(`/user-skills/username/${username}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal memperbarui data skill berdasarkan username"),
    };
  }
}
