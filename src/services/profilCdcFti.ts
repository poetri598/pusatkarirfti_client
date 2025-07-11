import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { ProfilCdcFtiItem } from "@/types/profilCdcFti";

// ✅ CREATE
export async function createProfilCdcFti(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ profil_cdc_fti_id: number }>>("/profil-cdc-fti", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal membuat profil CDC FTI") };
  }
}

// ✅ GET ALL
export async function getProfilCdcFtiAll() {
  try {
    const res = await api.get<ApiResponse<ProfilCdcFtiItem[]>>("/profil-cdc-fti");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data profil CDC FTI") };
  }
}

// ✅ GET BY ID
export async function getProfilCdcFtiById(profil_cdc_fti_id: number) {
  try {
    const res = await api.get<ApiResponse<ProfilCdcFtiItem>>(`/profil-cdc-fti/${profil_cdc_fti_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil detail profil CDC FTI") };
  }
}

// ✅ UPDATE
export async function updateProfilCdcFtiById(profil_cdc_fti_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/profil-cdc-fti/${profil_cdc_fti_id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal memperbarui profil CDC FTI") };
  }
}

// ✅ DELETE
export async function deleteProfilCdcFtiById(profil_cdc_fti_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/profil-cdc-fti/${profil_cdc_fti_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus profil CDC FTI") };
  }
}

// ✅ SEARCH & FILTER & SORT
export async function searchProfilCdcFti(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });
    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<ProfilCdcFtiItem[]>>(`/profil-cdc-fti/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mencari atau memfilter news"),
    };
  }
}
