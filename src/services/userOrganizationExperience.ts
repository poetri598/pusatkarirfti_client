import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { UserOrganizationExperienceItem } from "@/types/userOrganizationExperience";
import type { ApiResponse } from "@/utils/responseController";

// ✅ CREATE
export async function createUserOrganizationExperience(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<UserOrganizationExperienceItem>>("/user-organization-experiences", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menambahkan pengalaman organisasi"),
    };
  }
}

// ✅ GET ALL
export async function getAllUserOrganizationExperiences() {
  try {
    const res = await api.get<ApiResponse<UserOrganizationExperienceItem[]>>("/user-organization-experiences");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil semua data pengalaman organisasi"),
    };
  }
}

// ✅ GET BY ID
export async function getUserOrganizationExperienceById(id: number) {
  try {
    const res = await api.get<ApiResponse<UserOrganizationExperienceItem>>(`/user-organization-experiences/${id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil data pengalaman organisasi berdasarkan ID"),
    };
  }
}

// ✅ UPDATE BY ID
export async function updateUserOrganizationExperienceById(id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/user-organization-experiences/${id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengubah pengalaman organisasi"),
    };
  }
}

// ✅ DELETE BY ID
export async function deleteUserOrganizationExperienceById(id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/user-organization-experiences/${id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menghapus data pengalaman organisasi"),
    };
  }
}
