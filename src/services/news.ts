import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { NewsItem } from "@/types/news";

// ✅ CREATE
export async function createNews(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ news_id: number }>>("/news", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal membuat berita") };
  }
}

// ✅ GET ALL
export async function getNewsAll() {
  try {
    const res = await api.get<ApiResponse<NewsItem[]>>("/news");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil berita") };
  }
}

// ✅ GET BY ID
export async function getNewsById(news_id: number) {
  try {
    const res = await api.get<ApiResponse<NewsItem>>(`/news/${news_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil detail berita") };
  }
}

// ✅ UPDATE
export async function updateNewsById(news_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/news/${news_id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal memperbarui berita") };
  }
}

// ✅ DELETE
export async function deleteNewsById(news_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/news/${news_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus berita") };
  }
}

// ✅ GET BY SLUG
export async function getNewsBySlug(news_slug: string) {
  try {
    const res = await api.get<ApiResponse<NewsItem>>(`/news/slug/${news_slug}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil berita berdasarkan slug") };
  }
}

// ✅ GET THREE LATEST
export async function getThreeLatestNews() {
  try {
    const res = await api.get<ApiResponse<NewsItem[]>>("/news/three-latest");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil berita terbaru") };
  }
}

// ✅ GET ALL EXCEPT SLUG
export async function getAllNewsExceptSlug(news_slug: string) {
  try {
    const res = await api.get<ApiResponse<NewsItem[]>>(`/news/except/${news_slug}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil berita selain slug") };
  }
}

// ✅ GET ONE MOST POPULAR
export async function getOneMostPopularNews() {
  try {
    const res = await api.get<ApiResponse<NewsItem>>("/news/one-most-popular");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil berita terpopuler") };
  }
}

// ✅ INCREMENT VIEW
export async function incrementNewsView(news_slug: string) {
  try {
    const res = await api.patch<ApiResponse<null>>(`/news/view/${news_slug}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menambah view berita") };
  }
}

// ✅ GET ALL BY TYPE NAME KEGIATAN PUSAT KARIR FTI
export async function getNewsAllByTypeNameKegiatanPusatKarirFTI() {
  try {
    const res = await api.get<ApiResponse<NewsItem[]>>("/news/kegiatan-pusat-karir-fti");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil berita kegiatan pusat karir FTI") };
  }
}

// ✅ GET BY TYPE NAME EXCEPT SLUG
export async function getNewsAllByTypeNameKegiatanPusatKarirFTIExceptSlug(news_slug: string) {
  try {
    const res = await api.get<ApiResponse<NewsItem[]>>(`/news/kegiatan-pusat-karir-fti/except/${news_slug}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil berita kegiatan pusat karir FTI selain slug") };
  }
}

// ✅ SEARCH & FILTER & SORT
export async function searchNews(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });
    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<NewsItem[]>>(`/news/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mencari atau memfilter news"),
    };
  }
}

// ✅ SEARCH & FILTER & SORT ACTIVE
export async function searchNewsActive(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });
    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<NewsItem[]>>(`/news/search-active?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mencari atau memfilter news"),
    };
  }
}

// ✅ GET SUMMARY
export async function getSummary() {
  try {
    const res = await api.get<ApiResponse<{ total_all: number; total_status_1: number; total_status_2: number }>>("/news/summary");
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
