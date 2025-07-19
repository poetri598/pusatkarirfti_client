import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { JobItem } from "@/types/job";

// ✅ CREATE
export async function createJob(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ job_id: number }>>("/jobs", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal membuat job") };
  }
}

// ✅ GET ALL
export async function getJobAll() {
  try {
    const res = await api.get<ApiResponse<JobItem[]>>("/jobs");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil job") };
  }
}

// ✅ GET BY ID
export async function getJobById(job_id: number) {
  try {
    const res = await api.get<ApiResponse<JobItem>>(`/jobs/${job_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data job") };
  }
}

// ✅ UPDATE (FormData support for image upload)
export async function updateJobById(job_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/jobs/${job_id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal memperbarui job") };
  }
}

// ✅ DELETE
export async function deleteJobById(job_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/jobs/${job_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus job") };
  }
}

// ✅ GET BY SLUG
export async function getJobBySlug(job_slug: string) {
  try {
    const res = await api.get<ApiResponse<JobItem>>(`/jobs/slug/${job_slug}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data job") };
  }
}

// ✅ GET THREE LATEST
export async function getThreeLatestJobs() {
  try {
    const res = await api.get<ApiResponse<JobItem[]>>("/jobs/three-latest");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil job terbaru") };
  }
}

// ✅ GET ALL EXCEPT SLUG
export async function getAllJobsExceptSlug(job_slug: string) {
  try {
    const res = await api.get<ApiResponse<JobItem[]>>(`/jobs/except/${job_slug}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil job selain slug") };
  }
}

// ✅ INCREMENT VIEW
export async function incrementJobView(job_slug: string) {
  try {
    const res = await api.patch<ApiResponse<null>>(`/jobs/view/${job_slug}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menambah view job") };
  }
}

// ✅ SEARCH & FILTER & SORT
export async function searchJobs(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });
    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<JobItem[]>>(`/jobs/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mencari atau memfilter job"),
    };
  }
}

// ✅ SEARCH & FILTER & SORT Active
export async function searchJobsActive(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });
    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<JobItem[]>>(`/jobs/search-active?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mencari atau memfilter job"),
    };
  }
}

// ✅ GET JOB SUMMARY
export async function getJobSummary() {
  try {
    const res = await api.get<ApiResponse<{ total_all: number; total_status_1: number; total_status_2: number }>>("/jobs/summary");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil ringkasan data job"),
    };
  }
}
