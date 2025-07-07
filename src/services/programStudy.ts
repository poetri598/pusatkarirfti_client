import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { ProgramStudyItem } from "@/types/programStudy";

// ✅ CREATE
export async function createProgramStudy(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ program_study_id: number }>>("/program-studies", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menambahkan data program studi") };
  }
}

// ✅ GET ALL
export async function getAllProgramStudies() {
  try {
    const res = await api.get<ApiResponse<ProgramStudyItem[]>>("/program-studies");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data program studi") };
  }
}

// ✅ GET BY ID
export async function getProgramStudyById(program_study_id: number) {
  try {
    const res = await api.get<ApiResponse<ProgramStudyItem>>(`/program-studies/${program_study_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil detail data program studi") };
  }
}

// ✅ UPDATE BY ID
export async function updateProgramStudyById(program_study_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/program-studies/${program_study_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengubah data program studi") };
  }
}

// ✅ DELETE BY ID
export async function deleteProgramStudyById(program_study_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/program-studies/${program_study_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus data program studi") };
  }
}

// ✅ SEARCH / FILTER / SORT
export async function searchProgramStudies(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<ProgramStudyItem[]>>(`/program-studies/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mencari data program studi") };
  }
}
