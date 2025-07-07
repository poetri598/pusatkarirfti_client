import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { ProvinceItem } from "@/types/province";

// ✅ CREATE
export async function createProvince(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ province_id: number }>>("/provinces", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menambahkan data provinsi") };
  }
}

// ✅ GET ALL
export async function getProvinceAll() {
  try {
    const res = await api.get<ApiResponse<ProvinceItem[]>>("/provinces");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data provinsi") };
  }
}

// ✅ GET BY ID
export async function getProvinceById(province_id: number) {
  try {
    const res = await api.get<ApiResponse<ProvinceItem>>(`/provinces/${province_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil detail data provinsi") };
  }
}

// ✅ UPDATE BY ID
export async function updateProvinceById(province_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/provinces/${province_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengubah data provinsi") };
  }
}

// ✅ DELETE BY ID
export async function deleteProvinceById(province_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/provinces/${province_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus data provinsi") };
  }
}

// ✅ SEARCH / FILTER / SORT
export async function searchProvinces(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<ProvinceItem[]>>(`/provinces/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mencari data provinsi") };
  }
}
