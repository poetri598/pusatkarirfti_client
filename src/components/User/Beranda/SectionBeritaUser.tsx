"use client";
import { useEffect, useState } from "react";

// components
import TitleSection from "@/components/Custom/TitleSection";
import CardBerita from "@/components/Card/CardBerita";
import CardBerita2 from "@/components/Card/CardBerita2";
import { Spinner } from "@heroui/react";

// types
import type { NewsItem } from "@/types/news";

// services
import { getOneMostPopularNews, getThreeLatestNews } from "@/services/news";

// utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";

export default function SectionBeritaUser() {
  const [oneMostPopularNews, setOneMostPopularNews] = useState<NewsItem | null>(null);
  const [isLoadingOneMostPopularNews, setIsLoadingOneMostPopularNews] = useState(true);
  const [apiErrorOneMostPopularNews, setApiErrorOneMostPopularNews] = useState<string | null>(null);

  const [threeLatestNews, setThreeLatestNews] = useState<NewsItem[]>([]);
  const [isLoadingThreeLatestNews, setIsLoadingThreeLatestNews] = useState(true);
  const [apiErrorThreeLatestNews, setApiErrorThreeLatestNews] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [createServiceFetcher(getThreeLatestNews, setThreeLatestNews, setApiErrorThreeLatestNews, setIsLoadingThreeLatestNews)];
      await Promise.all(fetchers.map((fetch) => fetch()));

      const { success, data, error } = await getOneMostPopularNews();
      if (success) {
        if (data) {
          setOneMostPopularNews(data);
          setApiErrorOneMostPopularNews(null);
        } else {
          setOneMostPopularNews(null);
          setApiErrorOneMostPopularNews(null);
        }
      } else {
        setApiErrorOneMostPopularNews(error || "Gagal memuat berita populer.");
      }
      setIsLoadingOneMostPopularNews(false);
    };

    fetchAll();
  }, []);

  return (
    <section className="xs:w-11/12 lg:w-10/12   mx-auto flex flex-col gap-8 py-8 overflow-hidden">
      <TitleSection label="Berita" href="/berita" />

      <div className="flex flex-col gap-4">
        <div className="grid xs:grid-cols-1 xl:grid-cols-2 xs:gap-2 lg:gap-8">
          {/* Kolom kiri – berita utama */}
          {isLoadingOneMostPopularNews ? (
            <div className="w-full flex justify-center items-center py-8">
              <Spinner
                label="Sedang memuat data..."
                labelColor="primary"
                variant="dots"
                classNames={{
                  label: "text-primary-primary mt-4",
                  dots: "border-5 border-primary-primary",
                }}
              />
            </div>
          ) : apiErrorOneMostPopularNews ? (
            <p className="text-start text-xs text-danger-primary">{apiErrorOneMostPopularNews}</p>
          ) : !oneMostPopularNews ? (
            <p className="text-start text-xs text-text-secondary">Data belum tersedia</p>
          ) : (
            <CardBerita key={oneMostPopularNews.news_id} {...oneMostPopularNews} />
          )}

          {/* Kolom kanan – berita sekunder */}
          <div className="grid grid-rows-3 xs:gap-2 lg:gap-8">
            {isLoadingThreeLatestNews ? (
              <div className="w-full flex justify-center items-center py-8">
                <Spinner
                  label="Sedang memuat data..."
                  labelColor="primary"
                  variant="dots"
                  classNames={{
                    label: "text-primary-primary mt-4",
                    dots: "border-5 border-primary-primary",
                  }}
                />
              </div>
            ) : apiErrorThreeLatestNews ? (
              <p className="text-start text-xs text-danger-primary">{apiErrorThreeLatestNews}</p>
            ) : threeLatestNews.length === 0 ? (
              <p className="text-start text-xs text-text-secondary">Data belum tersedia</p>
            ) : (
              threeLatestNews.map((item) => <CardBerita2 key={item.news_id} {...item} />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
