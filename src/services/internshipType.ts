import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { InternshipTypeItem } from "@/types/internshipType";

// ✅ CREATE
export async function createInternshipType(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ internship_type_id: number }>>("/internship-types", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menambahkan jenis magang") };
  }
}

// ✅ GET ALL
export async function getInternshipTypeAll() {
  try {
    const res = await api.get<ApiResponse<InternshipTypeItem[]>>("/internship-types");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data jenis magang") };
  }
}

// ✅ GET BY ID
export async function getInternshipTypeById(internship_type_id: number) {
  try {
    const res = await api.get<ApiResponse<InternshipTypeItem>>(`/internship-types/${internship_type_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil detail jenis magang") };
  }
}

// ✅ UPDATE
export async function updateInternshipTypeById(internship_type_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/internship-types/${internship_type_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengubah data jenis magang") };
  }
}

// ✅ DELETE
export async function deleteInternshipTypeById(internship_type_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/internship-types/${internship_type_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus data jenis magang") };
  }
}

// ✅ SEARCH / FILTER / SORT
export async function searchInternshipTypes(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<InternshipTypeItem[]>>(`/internship-types/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mencari data jenis magang") };
  }
}
