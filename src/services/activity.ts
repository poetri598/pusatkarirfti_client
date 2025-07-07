import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { ActivityItem } from "@/types/activity";

// ✅ CREATE
export async function createActivity(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ activity_id: number }>>("/activities", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal membuat aktivitas") };
  }
}

// ✅ GET ALL
export async function getAllActivities() {
  try {
    const res = await api.get<ApiResponse<ActivityItem[]>>("/activities");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil aktivitas") };
  }
}

// ✅ GET BY ID
export async function getActivityById(activity_id: number) {
  try {
    const res = await api.get<ApiResponse<ActivityItem>>(`/activities/${activity_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data aktivitas") };
  }
}

// ✅ UPDATE
export async function updateActivityById(activity_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/activities/${activity_id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal memperbarui aktivitas") };
  }
}

// ✅ DELETE
export async function deleteActivityById(activity_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/activities/${activity_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus aktivitas") };
  }
}

// ✅ SEARCH & FILTER & SORT
export async function searchActivities(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });
    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<ActivityItem[]>>(`/activities/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mencari atau memfilter aktivitas"),
    };
  }
}
