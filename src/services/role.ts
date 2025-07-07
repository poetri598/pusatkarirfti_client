import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { RoleItem } from "@/types/role";

// ✅ CREATE
export async function createRole(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ role_id: number }>>("/roles", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menambahkan data role") };
  }
}

// ✅ GET ALL
export async function getRoleAll() {
  try {
    const res = await api.get<ApiResponse<RoleItem[]>>("/roles");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data role") };
  }
}

// ✅ GET BY ID
export async function getRoleById(role_id: number) {
  try {
    const res = await api.get<ApiResponse<RoleItem>>(`/roles/${role_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil detail data role") };
  }
}

// ✅ UPDATE
export async function updateRoleById(role_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/roles/${role_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengubah data role") };
  }
}

// ✅ DELETE
export async function deleteRoleById(role_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/roles/${role_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus data role") };
  }
}

// ✅ SEARCH / FILTER / SORT
export async function searchRoles(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<RoleItem[]>>(`/roles/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mencari data role") };
  }
}
