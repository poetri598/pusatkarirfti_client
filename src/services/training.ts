import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { TrainingItem } from "@/types/training";

// ✅ CREATE
export async function createTraining(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ training_id: number }>>("/trainings", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal membuat training") };
  }
}

// ✅ GET ALL
export async function getTrainingAll() {
  try {
    const res = await api.get<ApiResponse<TrainingItem[]>>("/trainings");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil training") };
  }
}

// ✅ GET BY ID
export async function getTrainingById(training_id: number) {
  try {
    const res = await api.get<ApiResponse<TrainingItem>>(`/trainings/${training_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data training") };
  }
}

// ✅ UPDATE (FormData support for image upload)
export async function updateTrainingById(training_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/trainings/${training_id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal memperbarui training") };
  }
}

// ✅ DELETE
export async function deleteTrainingById(training_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/trainings/${training_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus training") };
  }
}

// ✅ GET BY SLUG
export async function getTrainingBySlug(training_slug: string) {
  try {
    const res = await api.get<ApiResponse<TrainingItem>>(`/trainings/slug/${training_slug}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data training") };
  }
}

// ✅ GET THREE LATEST
export async function getThreeLatestTrainings() {
  try {
    const res = await api.get<ApiResponse<TrainingItem[]>>("/trainings/three-latest");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil training terbaru") };
  }
}

// ✅ GET ALL EXCEPT SLUG
export async function getAllTrainingsExceptSlug(training_slug: string) {
  try {
    const res = await api.get<ApiResponse<TrainingItem[]>>(`/trainings/except/${training_slug}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil training selain slug") };
  }
}

// ✅ INCREMENT VIEW
export async function incrementTrainingView(training_slug: string) {
  try {
    const res = await api.patch<ApiResponse<null>>(`/trainings/view/${training_slug}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menambah view training") };
  }
}

// ✅ SEARCH & FILTER & SORT
export async function searchTrainings(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });
    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<TrainingItem[]>>(`/trainings/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mencari atau memfilter training"),
    };
  }
}

// ✅ SEARCH & FILTER & SORT ACTIVE
export async function searchTrainingsActive(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });
    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<TrainingItem[]>>(`/trainings/search-active?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mencari atau memfilter training"),
    };
  }
}

// ✅ GET SUMMARY
export async function getSummary() {
  try {
    const res = await api.get<ApiResponse<{ total_all: number; total_status_1: number; total_status_2: number }>>("/trainings/summary");
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
