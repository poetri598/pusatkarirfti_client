import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { MaritalStatusItem } from "@/types/maritalStatus";

// ✅ CREATE
export async function createMaritalStatus(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ marital_status_id: number }>>("/marital-statuses", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menambahkan data status pernikahan") };
  }
}

// ✅ GET ALL
export async function getAllMaritalStatuses() {
  try {
    const res = await api.get<ApiResponse<MaritalStatusItem[]>>("/marital-statuses");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data status pernikahan") };
  }
}

// ✅ GET BY ID
export async function getMaritalStatusById(marital_status_id: number) {
  try {
    const res = await api.get<ApiResponse<MaritalStatusItem>>(`/marital-statuses/${marital_status_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil detail data status pernikahan") };
  }
}

// ✅ UPDATE BY ID
export async function updateMaritalStatusById(marital_status_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/marital-statuses/${marital_status_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengubah data status pernikahan") };
  }
}

// ✅ DELETE BY ID
export async function deleteMaritalStatusById(marital_status_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/marital-statuses/${marital_status_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus data status pernikahan") };
  }
}

// ✅ SEARCH / FILTER / SORT
export async function searchMaritalStatuses(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<MaritalStatusItem[]>>(`/marital-statuses/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mencari data status pernikahan") };
  }
}
