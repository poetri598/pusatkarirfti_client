import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { ReligionItem } from "@/types/religion";

// ✅ CREATE
export async function createReligion(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ religion_id: number }>>("/religions", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menambahkan data agama") };
  }
}

// ✅ GET ALL
export async function getReligionAll() {
  try {
    const res = await api.get<ApiResponse<ReligionItem[]>>("/religions");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data agama") };
  }
}

// ✅ GET BY ID
export async function getReligionById(religion_id: number) {
  try {
    const res = await api.get<ApiResponse<ReligionItem>>(`/religions/${religion_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil detail data agama") };
  }
}

// ✅ UPDATE BY ID
export async function updateReligionById(religion_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/religions/${religion_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengubah data agama") };
  }
}

// ✅ DELETE BY ID
export async function deleteReligionById(religion_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/religions/${religion_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus data agama") };
  }
}

// ✅ SEARCH / FILTER / SORT
export async function searchReligions(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<ReligionItem[]>>(`/religions/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mencari data agama") };
  }
}
