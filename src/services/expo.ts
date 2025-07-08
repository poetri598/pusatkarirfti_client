import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { ExpoItem } from "@/types/expo";

// ✅ CREATE
export async function createExpo(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ expo_id: number }>>("/expos", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal membuat expo") };
  }
}

// ✅ GET ALL
export async function getExpoAll() {
  try {
    const res = await api.get<ApiResponse<ExpoItem[]>>("/expos");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil expo") };
  }
}

// ✅ GET BY ID
export async function getExpoById(expo_id: number) {
  try {
    const res = await api.get<ApiResponse<ExpoItem>>(`/expos/${expo_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data expo") };
  }
}

// ✅ UPDATE (FormData support for image upload)
export async function updateExpoById(expo_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/expos/${expo_id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal memperbarui expo") };
  }
}

// ✅ DELETE
export async function deleteExpoById(expo_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/expos/${expo_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus expo") };
  }
}

// ✅ GET BY SLUG
export async function getExpoBySlug(expo_slug: string) {
  try {
    const res = await api.get<ApiResponse<ExpoItem>>(`/expos/slug/${expo_slug}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data expo") };
  }
}

// ✅ GET THREE LATEST
export async function getThreeLatestExpos() {
  try {
    const res = await api.get<ApiResponse<ExpoItem[]>>("/expos/three-latest");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil expo terbaru") };
  }
}

// ✅ GET ALL EXCEPT SLUG
export async function getAllExposExceptSlug(expo_slug: string) {
  try {
    const res = await api.get<ApiResponse<ExpoItem[]>>(`/expos/except/${expo_slug}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil expo selain slug") };
  }
}

// ✅ INCREMENT VIEW
export async function incrementExpoView(expo_slug: string) {
  try {
    const res = await api.patch<ApiResponse<null>>(`/expos/view/${expo_slug}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menambah view expo") };
  }
}

// ✅ SEARCH & FILTER & SORT
export async function searchExpos(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });
    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<ExpoItem[]>>(`/expos/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mencari atau memfilter expo"),
    };
  }
}

// ✅ SEARCH & FILTER & SORT
export async function searchExposActive(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });
    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<ExpoItem[]>>(`/expos/search-active?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mencari atau memfilter expo"),
    };
  }
}
