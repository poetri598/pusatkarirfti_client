import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { TrainingTypeItem } from "@/types/trainingType";

// ✅ CREATE
export async function createTrainingType(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ training_type_id: number }>>("/training-types", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menambahkan data training type") };
  }
}

// ✅ GET ALL
export async function getTrainingTypeAll() {
  try {
    const res = await api.get<ApiResponse<TrainingTypeItem[]>>("/training-types");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data training type") };
  }
}

// ✅ GET BY ID
export async function getTrainingTypeById(training_type_id: number) {
  try {
    const res = await api.get<ApiResponse<TrainingTypeItem>>(`/training-types/${training_type_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil detail data training type") };
  }
}

// ✅ UPDATE BY ID
export async function updateTrainingTypeById(training_type_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/training-types/${training_type_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengubah data training type") };
  }
}

// ✅ DELETE
export async function deleteTrainingTypeById(training_type_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/training-types/${training_type_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus data training type") };
  }
}

// ✅ SEARCH / FILTER / SORT
export async function searchTrainingTypes(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<TrainingTypeItem[]>>(`/training-types/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mencari data training type") };
  }
}
