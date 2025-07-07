import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { InternshipItem } from "@/types/internship";

// ✅ CREATE
export async function createInternship(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ internship_id: number }>>("/internships", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal membuat internship") };
  }
}

// ✅ GET ALL
export async function getAllInternships() {
  try {
    const res = await api.get<ApiResponse<InternshipItem[]>>("/internships");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil internship") };
  }
}

// ✅ GET BY ID
export async function getInternshipById(internship_id: number) {
  try {
    const res = await api.get<ApiResponse<InternshipItem>>(`/internships/${internship_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data internship") };
  }
}

// ✅ UPDATE (FormData support for image upload)
export async function updateInternshipById(internship_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/internships/${internship_id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal memperbarui internship") };
  }
}

// ✅ DELETE
export async function deleteInternshipById(internship_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/internships/${internship_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus internship") };
  }
}

// ✅ GET BY SLUG
export async function getInternshipBySlug(internship_slug: string) {
  try {
    const res = await api.get<ApiResponse<InternshipItem>>(`/internships/slug/${internship_slug}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data internship") };
  }
}

// ✅ GET THREE LATEST
export async function getThreeLatestInternships() {
  try {
    const res = await api.get<ApiResponse<InternshipItem[]>>("/internships/three-latest");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil internship terbaru") };
  }
}

// ✅ GET ALL EXCEPT SLUG
export async function getAllInternshipsExceptSlug(internship_slug: string) {
  try {
    const res = await api.get<ApiResponse<InternshipItem[]>>(`/internships/except/${internship_slug}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil internship selain slug") };
  }
}

// ✅ INCREMENT VIEW
export async function incrementInternshipView(internship_slug: string) {
  try {
    const res = await api.patch<ApiResponse<null>>(`/internships/view/${internship_slug}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menambah view internship") };
  }
}

// ✅ SEARCH & FILTER & SORT
export async function searchInternships(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });
    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<InternshipItem[]>>(`/internships/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mencari atau memfilter internship"),
    };
  }
}
