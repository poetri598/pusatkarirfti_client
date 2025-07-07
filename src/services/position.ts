import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { PositionItem } from "@/types/position";

// ✅ CREATE
export async function createPosition(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ position_id: number }>>("/positions", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menambahkan data posisi") };
  }
}

// ✅ GET ALL
export async function getPositionAll() {
  try {
    const res = await api.get<ApiResponse<PositionItem[]>>("/positions");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data posisi") };
  }
}

// ✅ GET BY ID
export async function getPositionById(position_id: number) {
  try {
    const res = await api.get<ApiResponse<PositionItem>>(`/positions/${position_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil detail data posisi") };
  }
}

// ✅ UPDATE BY ID
export async function updatePositionById(position_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/positions/${position_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengubah data posisi") };
  }
}

// ✅ DELETE BY ID
export async function deletePositionById(position_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/positions/${position_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus data posisi") };
  }
}

// ✅ SEARCH / FILTER / SORT
export async function searchPositions(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<PositionItem[]>>(`/positions/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mencari data posisi") };
  }
}
