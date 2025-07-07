import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { NewsTypeItem } from "@/types/newsType";

// ✅ CREATE
export async function createNewsType(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ news_type_id: number }>>("/news-types", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menambahkan data jenis berita") };
  }
}

// ✅ GET ALL
export async function getNewsTypeAll() {
  try {
    const res = await api.get<ApiResponse<NewsTypeItem[]>>("/news-types");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data jenis berita") };
  }
}

// ✅ GET BY ID
export async function getNewsTypeById(news_type_id: number) {
  try {
    const res = await api.get<ApiResponse<NewsTypeItem>>(`/news-types/${news_type_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil detail data jenis berita") };
  }
}

// ✅ UPDATE BY ID
export async function updateNewsTypeById(news_type_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/news-types/${news_type_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengubah data jenis berita") };
  }
}

// ✅ DELETE BY ID
export async function deleteNewsTypeById(news_type_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/news-types/${news_type_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus data jenis berita") };
  }
}

// ✅ SEARCH / FILTER / SORT
export async function searchNewsTypes(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<NewsTypeItem[]>>(`/news-types/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mencari data jenis berita") };
  }
}
