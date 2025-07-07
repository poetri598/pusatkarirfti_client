import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { CounselingItem } from "@/types/counseling";

// ✅ CREATE (FormData)
export async function createCounseling(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ counseling_id: number }>>("/counselings", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal membuat counseling") };
  }
}

// ✅ GET ALL
export async function getCounselingAll() {
  try {
    const res = await api.get<ApiResponse<CounselingItem[]>>("/counselings");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil counseling") };
  }
}

// ✅ GET BY ID
export async function getCounselingById(counseling_id: number) {
  try {
    const res = await api.get<ApiResponse<CounselingItem>>(`/counselings/${counseling_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data counseling") };
  }
}

// ✅ UPDATE (FormData)
export async function updateCounselingById(counseling_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/counselings/${counseling_id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal memperbarui counseling") };
  }
}

// ✅ DELETE
export async function deleteCounselingById(counseling_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/counselings/${counseling_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus counseling") };
  }
}

// ✅ GET BY USER ID
export async function getCounselingsByUserId(user_id: number) {
  try {
    const res = await api.get<ApiResponse<CounselingItem[]>>(`/counselings/user/${user_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil counseling user") };
  }
}

// ✅ SEARCH & FILTER & SORT
export async function searchCounselings(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<CounselingItem[]>>(`/counselings/search?${query}`);

    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }

    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mencari atau memfilter counseling"),
    };
  }
}
