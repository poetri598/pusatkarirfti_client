import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { WeightItem } from "@/types/weight";

// ✅ CREATE
export async function createWeight(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ weight_id: number }>>("/weights", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menambahkan data berat badan") };
  }
}

// ✅ GET ALL
export async function getAllWeights() {
  try {
    const res = await api.get<ApiResponse<WeightItem[]>>("/weights");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data berat badan") };
  }
}

// ✅ GET BY ID
export async function getWeightById(weight_id: number) {
  try {
    const res = await api.get<ApiResponse<WeightItem>>(`/weights/${weight_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil detail data berat badan") };
  }
}

// ✅ UPDATE BY ID
export async function updateWeightById(weight_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/weights/${weight_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengubah data berat badan") };
  }
}

// ✅ DELETE
export async function deleteWeightById(weight_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/weights/${weight_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus data berat badan") };
  }
}

// ✅ SEARCH / FILTER / SORT
export async function searchWeights(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<WeightItem[]>>(`/weights/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mencari data berat badan") };
  }
}
