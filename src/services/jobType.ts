import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { JobTypeItem } from "@/types/jobType";

// ✅ CREATE
export async function createJobType(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ job_type_id: number }>>("/job-types", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menambahkan data jenis pekerjaan") };
  }
}

// ✅ GET ALL
export async function getJobTypeAll() {
  try {
    const res = await api.get<ApiResponse<JobTypeItem[]>>("/job-types");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data jenis pekerjaan") };
  }
}

// ✅ GET BY ID
export async function getJobTypeById(job_type_id: number) {
  try {
    const res = await api.get<ApiResponse<JobTypeItem>>(`/job-types/${job_type_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil detail data jenis pekerjaan") };
  }
}

// ✅ UPDATE BY ID
export async function updateJobTypeById(job_type_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/job-types/${job_type_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengubah data jenis pekerjaan") };
  }
}

// ✅ DELETE BY ID
export async function deleteJobTypeById(job_type_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/job-types/${job_type_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus data jenis pekerjaan") };
  }
}

// ✅ SEARCH / FILTER / SORT
export async function searchJobTypes(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<JobTypeItem[]>>(`/job-types/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mencari data jenis pekerjaan") };
  }
}
