import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { CountryItem } from "@/types/country";

// ✅ CREATE
export async function createCountry(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ country_id: number }>>("/countries", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal membuat data negara"),
    };
  }
}

// ✅ GET ALL
export async function getAllCountries() {
  try {
    const res = await api.get<ApiResponse<CountryItem[]>>("/countries");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil data negara"),
    };
  }
}

// ✅ GET BY ID
export async function getCountryById(country_id: number) {
  try {
    const res = await api.get<ApiResponse<CountryItem>>(`/countries/${country_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil detail negara"),
    };
  }
}

// ✅ UPDATE
export async function updateCountryById(country_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/countries/${country_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal memperbarui data negara"),
    };
  }
}

// ✅ DELETE
export async function deleteCountryById(country_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/countries/${country_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menghapus data negara"),
    };
  }
}

// ✅ SEARCH FILTER SORT
export async function searchCountries(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<CountryItem[]>>(`/countries/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mencari/memfilter data negara"),
    };
  }
}
