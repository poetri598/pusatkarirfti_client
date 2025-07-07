"use client";
import React, { useState, useEffect } from "react";
import { Calendar, Eye } from "iconsax-react";
import { Avatar, Breadcrumbs, BreadcrumbItem, Image, Tooltip, Chip, Spinner } from "@heroui/react";
import { getRelativeTimeRaw, getFullTimeRaw } from "@/utils/time";
import { NewsItem } from "@/types/news";
import { formatViews } from "@/utils/view";
import { getNewsBySlug, incrementNewsView } from "@/services/news";
import RichTextDisplay from "@/components/Custom/RichTextDisplay";

export default function PageBeritaDetail({ news_slug }: { news_slug: string }) {
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!news_slug) return;
        await incrementNewsView(news_slug);

        const NewsRes = await getNewsBySlug(news_slug);
        if (NewsRes.success && NewsRes.data) {
          setNews(NewsRes.data);
        } else {
          setNews(null);
        }
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [news_slug]);

  if (loading)
    return (
      <div className="xs:p-0 md:p-8  flex flex-col xs:gap-2 md:gap-8 overflow-hidden">
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
    );
  if (!news) return <p>Data tidak ditemukan.</p>;

  return (
    <main className="xs:p-0 md:p-8  flex flex-col xs:gap-2 md:gap-8 overflow-hidden">
      <section className="flex flex-col xs:gap-2 md:gap-8">
        {/* Breadcrumb */}
        <Breadcrumbs
          itemClasses={{
            item: "data-[current=true]:text-primary-primary text-xs text-text-secondary",
          }}
        >
          <BreadcrumbItem href="/">Beranda</BreadcrumbItem>
          <BreadcrumbItem href="/berita">Berita</BreadcrumbItem>
          <BreadcrumbItem href={`/berita/${news.news_slug}`}>Detail Berita</BreadcrumbItem>
        </Breadcrumbs>

        <div className="flex flex-col  gap-8">
          {/* Image */}
          <Image
            src={news.news_img}
            alt={news.news_img}
            width={1280}
            height={720}
            loading="lazy"
            classNames={{ img: "!max-w-full !h-full aspect-video object-contain object-center rounded-md ", wrapper: "!max-w-full flex justify-center rounded-md bg-background-primary" }}
          />

          {/* User & Created at */}
          <div className="flex xs:flex-col xs:items-start sm:flex-row sm:justify-between sm:items-center  gap-2 ">
            <div className="flex items-center gap-1">
              <Avatar src={news.user_img} className="w-8 h-8" />
              <div className="flex flex-col">
                <span className="text-xs text-text-secondary">{news.user_fullname}</span>
                <span className="text-xs text-text-secondary">{news.role_name}</span>
              </div>
            </div>
            <div className="flex xs:flex-col xs:items-start sm:flex-row sm:items-center gap-1">
              <Tooltip content={news.news_views.toLocaleString("id-ID")} placement="top" classNames={{ content: "text-xs text-background-primary bg-primary-primary" }}>
                <div className="flex items-center gap-1">
                  <Eye size="20" color="currentColor" className="text-text-secondary" />
                  <span className="text-xs text-text-secondary"> {formatViews(news.news_views)} kali dilihat</span>
                </div>
              </Tooltip>
              <Tooltip content={getFullTimeRaw(news.news_created_at)} placement="top" classNames={{ content: "text-xs text-background-primary bg-primary-primary" }}>
                <div className="flex items-center gap-1">
                  <Calendar size="20" color="currentColor" className="text-text-secondary" />
                  <span className="text-xs text-text-secondary cursor-help">Diposting {getRelativeTimeRaw(news.news_created_at)}</span>
                </div>
              </Tooltip>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="flex flex-col gap-2">
            <span className="xs:text-sm md:text-2xl font-bold text-text-primary">{news.news_name}</span>
            <RichTextDisplay html={news?.news_desc} />
          </div>

          {/* Detail Informasi */}
          <div className="flex flex-wrap items-start gap-2 ">
            {((news.news_tags as string) || "").split(",").map((tag, index) => (
              <Chip key={index} className="text-xs text-primary-primary bg-background-primary border border-default-200">
                {tag.trim()}
              </Chip>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
