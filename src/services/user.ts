import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import { updateStoredUser } from "@/utils/updateStoredUser";
import type { UserItem } from "@/types/user";
import type { ApiResponse } from "@/utils/responseController";
import { useAuth } from "@/context/AuthContext";

// ✅ CREATE USER (FormData)
export async function createUser(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<UserItem>>("/users", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal membuat user"),
    };
  }
}

// ✅ GET ALL USERS
export async function getUserAll() {
  try {
    const res = await api.get<ApiResponse<UserItem[]>>("/users");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil semua data user"),
    };
  }
}

// ✅ GET USER BY ID
export async function getUserById(user_id: number | string) {
  try {
    const res = await api.get<ApiResponse<UserItem>>(`/users/${user_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil data user berdasarkan ID"),
    };
  }
}

// ✅ UPDATE BY ID
export async function updateUserById(user_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/users/${user_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      const userRes = await api.get<ApiResponse<UserItem>>(`/users/${user_id}`);
      if (userRes.data.status === "success") {
        return { success: true };
      }
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal memperbarui user"),
    };
  }
}

// ✅ DELETE USER BY ID
export async function deleteUserById(user_id: number | string) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/users/${user_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menghapus user berdasarkan ID"),
    };
  }
}

// ✅ GET USER BY USERNAME
export async function getUserByUsername(user_name: string) {
  try {
    const res = await api.get<ApiResponse<UserItem>>(`/users/username/${user_name}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil data user berdasarkan username"),
    };
  }
}

// ✅ GET ALL USERS ADMIN
export async function getUserAllAdmin() {
  try {
    const res = await api.get<ApiResponse<UserItem[]>>("/users/admin");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil semua data user"),
    };
  }
}

// ✅ UPDATE PROFILE (FormData only)
export async function updateUserProfile(user_name: string, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/users/username/${user_name}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      const userRes = await api.get<ApiResponse<UserItem>>(`/users/username/${user_name}`);
      if (userRes.data.status === "success") {
        updateStoredUser(userRes.data.data);
      }
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal memperbarui profil"),
    };
  }
}

// ✅ UPDATE EMAIL (FormData)
export async function updateUserEmailByUsername(user_name: string, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/users/email/${user_name}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      const userRes = await api.get<ApiResponse<UserItem>>(`/users/username/${user_name}`);
      if (userRes.data.status === "success") {
        updateStoredUser(userRes.data.data);
      }
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal memperbarui email"),
    };
  }
}

// ✅ UPDATE PASSWORD (FormData)
export async function updateUserPasswordByUsername(user_name: string, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/users/password/${user_name}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal memperbarui password"),
    };
  }
}

// ✅ DELETE USER BY USERNAME
export async function deleteUserByUsername(user_name: string) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/users/username/${user_name}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menghapus user berdasarkan username"),
    };
  }
}

// ✅ SEARCH & FILTER & SORT
export async function searchUsers(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });
    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<UserItem[]>>(`/users/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mencari atau memfilter User"),
    };
  }
}
