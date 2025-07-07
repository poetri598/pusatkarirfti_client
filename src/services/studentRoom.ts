import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { StudentRoomItem } from "@/types/studentRoom";

// ✅ CREATE
export async function createStudentRoom(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ student_room_id: number }>>("/student-rooms", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menambahkan data student room") };
  }
}

// ✅ GET ALL
export async function getAllStudentRooms() {
  try {
    const res = await api.get<ApiResponse<StudentRoomItem[]>>("/student-rooms");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data student room") };
  }
}

// ✅ GET BY ID
export async function getStudentRoomById(student_room_id: number) {
  try {
    const res = await api.get<ApiResponse<StudentRoomItem>>(`/student-rooms/${student_room_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil detail data student room") };
  }
}

// ✅ UPDATE BY ID
export async function updateStudentRoomById(student_room_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/student-rooms/${student_room_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengubah data student room") };
  }
}

// ✅ DELETE
export async function deleteStudentRoomById(student_room_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/student-rooms/${student_room_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus data student room") };
  }
}

// ✅ GET FOUR LATEST
export async function getFourLatestStudentRooms() {
  try {
    const res = await api.get<ApiResponse<StudentRoomItem[]>>("/student-rooms/four-latest");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data terbaru student room") };
  }
}

// ✅ SEARCH / FILTER / SORT
export async function searchStudentRooms(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<StudentRoomItem[]>>(`/student-rooms/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mencari data student room") };
  }
}
