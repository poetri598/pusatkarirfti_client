import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { IpkItem } from "@/types/ipk";

// ✅ CREATE
export async function createIpk(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ ipk_id: number }>>("/ipks", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menambahkan data IPK") };
  }
}

// ✅ GET ALL
export async function getIpkAll() {
  try {
    const res = await api.get<ApiResponse<IpkItem[]>>("/ipks");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data IPK") };
  }
}

// ✅ GET BY ID
export async function getIpkById(ipk_id: number) {
  try {
    const res = await api.get<ApiResponse<IpkItem>>(`/ipks/${ipk_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil detail data IPK") };
  }
}

// ✅ UPDATE BY ID
export async function updateIpkById(ipk_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/ipks/${ipk_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengubah data IPK") };
  }
}

// ✅ DELETE BY ID
export async function deleteIpkById(ipk_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/ipks/${ipk_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus data IPK") };
  }
}

// ✅ SEARCH / FILTER / SORT
export async function searchIpks(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<IpkItem[]>>(`/ipks/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mencari data IPK") };
  }
}
