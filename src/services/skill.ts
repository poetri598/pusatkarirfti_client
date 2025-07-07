import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { SkillItem } from "@/types/skill";

// ✅ CREATE
export async function createSkill(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ skill_id: number }>>("/skills", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menambahkan data skill") };
  }
}

// ✅ GET ALL
export async function getAllSkills() {
  try {
    const res = await api.get<ApiResponse<SkillItem[]>>("/skills");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data skill") };
  }
}

// ✅ GET BY ID
export async function getSkillById(skill_id: number) {
  try {
    const res = await api.get<ApiResponse<SkillItem>>(`/skills/${skill_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil detail data skill") };
  }
}

// ✅ UPDATE
export async function updateSkillById(skill_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/skills/${skill_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengubah data skill") };
  }
}

// ✅ DELETE
export async function deleteSkillById(skill_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/skills/${skill_id}`, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus data skill") };
  }
}

// ✅ SEARCH / FILTER / SORT
export async function searchSkills(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<SkillItem[]>>(`/skills/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mencari data skill") };
  }
}
