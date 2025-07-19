import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { UserOrganizationExperienceItem } from "@/types/userOrganizationExperience";

// ✅ CREATE
export async function createOrganizationExperiences(formData: FormData) {
  try {
    const res = await api.post<ApiResponse<{ insertedCount: number }>>("/organization-experiences", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal membuat pengalaman organisasi"),
    };
  }
}

// ✅ GET ALL
export async function getOrganizationExperiencesAll() {
  try {
    const res = await api.get<ApiResponse<UserOrganizationExperienceItem[]>>("/organization-experiences");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil pengalaman organisasi"),
    };
  }
}

// ✅ GET BY ID
export async function getOrganizationExperienceById(user_organization_experience_id: number) {
  try {
    const res = await api.get<ApiResponse<UserOrganizationExperienceItem>>(`/organization-experiences/${user_organization_experience_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil detail pengalaman organisasi"),
    };
  }
}

// ✅ UPDATE BY ID
export async function updateOrganizationExperienceById(user_organization_experience_id: number, formData: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/organization-experiences/${user_organization_experience_id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal memperbarui pengalaman organisasi"),
    };
  }
}

// ✅ DELETE BY ID
export async function deleteOrganizationExperienceById(user_organization_experience_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/organization-experiences/${user_organization_experience_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menghapus pengalaman organisasi"),
    };
  }
}

// ✅ GET BY USERNAME
export async function getOrganizationExperiencesByUsername(username: string) {
  try {
    const res = await api.get<ApiResponse<UserOrganizationExperienceItem[]>>(`/organization-experiences/username/${username}`);

    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil pengalaman organisasi berdasarkan username"),
    };
  }
}

// ✅ DELETE BY USERNAME
export async function deleteOrganizationExperiencesByUsername(username: string) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/organization-experiences/username/${username}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menghapus pengalaman organisasi berdasarkan username"),
    };
  }
}

// ✅ UPDATE BY USERNAME
export async function updateOrganizationExperiencesByUsername(username: string, formData: FormData) {
  try {
    const res = await api.put<ApiResponse<{ insertedCount: number }>>(`/organization-experiences/username/${username}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal memperbarui pengalaman organisasi berdasarkan username"),
    };
  }
}
