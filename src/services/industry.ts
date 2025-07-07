import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { IndustryItem } from "@/types/industry";

// ✅ CREATE
export async function createIndustry(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ industry_id: number }>>("/industries", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menambahkan industri") };
  }
}

// ✅ GET ALL
export async function getAllIndustries() {
  try {
    const res = await api.get<ApiResponse<IndustryItem[]>>("/industries");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data industri") };
  }
}

// ✅ GET BY ID
export async function getIndustryById(industry_id: number) {
  try {
    const res = await api.get<ApiResponse<IndustryItem>>(`/industries/${industry_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil detail industri") };
  }
}

// ✅ UPDATE
export async function updateIndustryById(industry_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/industries/${industry_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengubah data industri") };
  }
}

// ✅ DELETE
export async function deleteIndustryById(industry_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/industries/${industry_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus industri") };
  }
}

// ✅ SEARCH / FILTER / SORT
export async function searchIndustries(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<IndustryItem[]>>(`/industries/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mencari data industri") };
  }
}
