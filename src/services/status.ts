import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { StatusItem } from "@/types/status";

// ✅ CREATE
export async function createStatus(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ status_id: number }>>("/statuses", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menambahkan data status") };
  }
}

// ✅ GET ALL
export async function getAllStatuses() {
  try {
    const res = await api.get<ApiResponse<StatusItem[]>>("/statuses");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data status") };
  }
}

// ✅ GET BY ID
export async function getStatusById(status_id: number) {
  try {
    const res = await api.get<ApiResponse<StatusItem>>(`/statuses/${status_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil detail data status") };
  }
}

// ✅ UPDATE
export async function updateStatusById(status_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/statuses/${status_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengubah data status") };
  }
}

// ✅ DELETE
export async function deleteStatusById(status_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/statuses/${status_id}`, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus data status") };
  }
}

// ✅ SEARCH / FILTER / SORT
export async function searchStatuses(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<StatusItem[]>>(`/statuses/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mencari data status") };
  }
}
