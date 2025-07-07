import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { SemesterItem } from "@/types/semester";

// ✅ CREATE
export async function createSemester(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ semester_id: number }>>("/semesters", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menambahkan data semester") };
  }
}

// ✅ GET ALL
export async function getSemesterAll() {
  try {
    const res = await api.get<ApiResponse<SemesterItem[]>>("/semesters");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data semester") };
  }
}

// ✅ GET BY ID
export async function getSemesterById(semester_id: number) {
  try {
    const res = await api.get<ApiResponse<SemesterItem>>(`/semesters/${semester_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil detail data semester") };
  }
}

// ✅ UPDATE
export async function updateSemesterById(semester_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/semesters/${semester_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengubah data semester") };
  }
}

// ✅ DELETE
export async function deleteSemesterById(semester_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/semesters/${semester_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus data semester") };
  }
}

// ✅ SEARCH / FILTER / SORT
export async function searchSemesters(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<SemesterItem[]>>(`/semesters/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mencari data semester") };
  }
}
