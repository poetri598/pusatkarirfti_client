import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { CompanyItem } from "@/types/company";

// ✅ CREATE
export async function createCompany(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ company_id: number }>>("/companies", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal membuat data perusahaan") };
  }
}

// ✅ GET ALL
export async function getAllCompanies() {
  try {
    const res = await api.get<ApiResponse<CompanyItem[]>>("/companies");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data perusahaan") };
  }
}

// ✅ GET BY ID
export async function getCompanyById(company_id: number) {
  try {
    const res = await api.get<ApiResponse<CompanyItem>>(`/companies/${company_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil detail perusahaan") };
  }
}

// ✅ UPDATE
export async function updateCompanyById(company_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/companies/${company_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal memperbarui data perusahaan") };
  }
}

// ✅ DELETE
export async function deleteCompanyById(company_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/companies/${company_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus data perusahaan") };
  }
}

// ✅ GET ONLY PARTNER COMPANIES
export async function getPartnerCompanies() {
  try {
    const res = await api.get<ApiResponse<CompanyItem[]>>("/companies/is-partner");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil data mitra perusahaan"),
    };
  }
}

// ✅ SEARCH FILTER SORT
export async function searchCompanies(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<CompanyItem[]>>(`/companies/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mencari/memfilter data perusahaan"),
    };
  }
}
