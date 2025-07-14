import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { UserSkillItem } from "@/types/userSkill";
import type { ApiResponse } from "@/utils/responseController";

// ✅ CREATE
export async function createUserSkill(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<UserSkillItem>>("/user-skills", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menambahkan skill"),
    };
  }
}

// ✅ GET ALL
export async function getAllUserSkills() {
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
      error: extractErrorMessage(err, "Gagal mengambil data skill berdasarkan ID"),
    };
  }
}

// ✅ UPDATE BY ID
export async function updateUserSkillById(user_skill_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/user-skills/${user_skill_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengubah skill"),
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
