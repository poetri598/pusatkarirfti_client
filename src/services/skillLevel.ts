import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { SkillLevelItem } from "@/types/skillLevel";

// ✅ CREATE
export async function createSkillLevel(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ skill_level_id: number }>>("/skill-levels", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "success") return { success: true, data: res.data.data };
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal membuat data level skill") };
  }
}

// ✅ GET ALL
export async function getSkillLevelAll() {
  try {
    const res = await api.get<ApiResponse<SkillLevelItem[]>>("/skill-levels");
    if (res.data.status === "success") return { success: true, data: res.data.data };
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data level skill") };
  }
}

// ✅ GET BY ID
export async function getSkillLevelById(skill_level_id: number) {
  try {
    const res = await api.get<ApiResponse<SkillLevelItem>>(`/skill-levels/${skill_level_id}`);
    if (res.data.status === "success") return { success: true, data: res.data.data };
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data level skill") };
  }
}

// ✅ UPDATE
export async function updateSkillLevelById(skill_level_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/skill-levels/${skill_level_id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "success") return { success: true };
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal memperbarui data level skill") };
  }
}

// ✅ DELETE
export async function deleteSkillLevelById(skill_level_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/skill-levels/${skill_level_id}`);
    if (res.data.status === "success") return { success: true };
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus data level skill") };
  }
}

// ✅ SEARCH & FILTER & SORT
export async function searchSkillLevels(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });
    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<SkillLevelItem[]>>(`/skill-levels/search?${query}`);
    if (res.data.status === "success") return { success: true, data: res.data.data };
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mencari atau memfilter data level skill"),
    };
  }
}
