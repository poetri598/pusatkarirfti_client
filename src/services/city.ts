import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { CityItem } from "@/types/city";

// ✅ CREATE
export async function createCity(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ city_id: number }>>("/cities", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal membuat data kota") };
  }
}

// ✅ GET ALL
export async function getAllCities() {
  try {
    const res = await api.get<ApiResponse<CityItem[]>>("/cities");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data kota") };
  }
}

// ✅ GET BY ID
export async function getCityById(city_id: number) {
  try {
    const res = await api.get<ApiResponse<CityItem>>(`/cities/${city_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data kota") };
  }
}

// ✅ UPDATE
export async function updateCityById(city_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/cities/${city_id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal memperbarui data kota") };
  }
}

// ✅ DELETE
export async function deleteCityById(city_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/cities/${city_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus data kota") };
  }
}

// ✅ SEARCH & FILTER & SORT
export async function searchCities(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });
    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<CityItem[]>>(`/cities/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mencari atau memfilter data kota"),
    };
  }
}
