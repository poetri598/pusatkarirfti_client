"use client";
import React, { useState, useEffect } from "react";
import { Calendar, Eye } from "iconsax-react";
import { Avatar, Breadcrumbs, BreadcrumbItem, Image, Tooltip, Chip, Spinner } from "@heroui/react";
import { getRelativeTime, formatFullDate } from "@/utils/time";
import { NewsItem } from "@/types/news";
import TitleSection from "@/components/Custom/TitleSection";
import CardBerita2 from "@/components/Card/CardBerita2";
import { formatViews } from "@/utils/view";

import { getNewsBySlug, getNewsAllByTypeNameKegiatanPusatKarirFTIExceptSlug, incrementNewsView } from "@/services/news";

export default function SectionBeritaClient({ news_slug }: { news_slug: string }) {
  const [news, setNews] = useState<NewsItem | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);
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

        const relatedRes = await getNewsAllByTypeNameKegiatanPusatKarirFTIExceptSlug(news_slug);
        if (relatedRes.success && relatedRes.data) {
          setRelatedNews(relatedRes.data);
        } else {
          setRelatedNews([]);
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
    );
  if (!news) return <p>Data tidak ditemukan.</p>;

  const NewsCreatedAtDate = news.news_created_at ? new Date(news.news_created_at) : null;

  const relativeDate = NewsCreatedAtDate ? getRelativeTime(NewsCreatedAtDate.toISOString()) : "";
  const fullDate = NewsCreatedAtDate ? formatFullDate(NewsCreatedAtDate.toISOString()) : "";
  return (
    <main className="xs:w-11/12 lg:w-10/12 flex flex-col mx-auto bg-background-primary py-8 gap-8">
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
              <Tooltip content={formatFullDate(news.news_created_at)} placement="top" classNames={{ content: "text-xs text-background-primary bg-primary-primary" }}>
                <div className="flex items-center gap-1">
                  <Calendar size="20" color="currentColor" className="text-text-secondary" />
                  <span className="text-xs text-text-secondary cursor-help">Diposting {getRelativeTime(news.news_created_at)}</span>
                </div>
              </Tooltip>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="flex flex-col gap-2">
            <span className="xs:text-sm md:text-2xl font-bold text-text-primary">{news.news_name}</span>
            <p className="text-xs text-text-secondary text-justify">{news.news_desc}</p>
          </div>

          {/* Detail Informasi */}
          <div className="flex flex-wrap items-start gap-2 ">
            {((news.tag_names as string) || "").split(",").map((tag, index) => (
              <Chip key={index} className="text-xs text-primary-primary bg-background-primary border border-default-200">
                {tag.trim()}
              </Chip>
            ))}
          </div>
        </div>
      </section>

      {/* Lainnya*/}
      <section className="flex flex-col gap-8 bg-background-primary ">
        <TitleSection label="Lainnya" href="/news" />
        {/* Card */}
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 xs:gap-2 lg:gap-8">
          {relatedNews.length === 0 ? <p className="text-start text-xs text-text-secondary">Data belum tersedia</p> : relatedNews.map((item) => <CardBerita2 key={item.news_id} {...item} />)}
        </div>
      </section>
    </main>
  );
}
