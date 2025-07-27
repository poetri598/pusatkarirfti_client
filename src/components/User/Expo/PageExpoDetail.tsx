"use client";
import React, { useState, useEffect } from "react";
import { Location, Tag, Calendar, Eye, Building } from "iconsax-react";
import { Avatar, Breadcrumbs, BreadcrumbItem, Image, Tooltip, ScrollShadow, Snippet, Spinner, Chip } from "@heroui/react";
import { getRelativeTimeRaw, getFullTimeRaw } from "@/utils/time";
import { ExpoItem } from "@/types/expo";
import TitleSection from "@/components/Custom/TitleSection";
import CardExpo from "@/components/Card/CardExpo";
import { formatViews } from "@/utils/view";
import RichTextDisplay from "@/components/Custom/RichTextDisplay";

import { getExpoBySlug, getAllExposExceptSlug, incrementExpoView } from "@/services/expo";

export default function PagePelatihanDetail({ expo_slug }: { expo_slug: string }) {
  const [expo, setExpo] = useState<ExpoItem | null>(null);
  const [relatedExpos, setRelatedExpos] = useState<ExpoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!expo_slug) return;
        await incrementExpoView(expo_slug);

        const expoRes = await getExpoBySlug(expo_slug);
        if (expoRes.success && expoRes.data) {
          setExpo(expoRes.data);
        } else {
          setExpo(null);
        }

        const relatedRes = await getAllExposExceptSlug(expo_slug);
        if (relatedRes.success && relatedRes.data) {
          setRelatedExpos(relatedRes.data);
        } else {
          setRelatedExpos([]);
        }
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [expo_slug]);

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
  if (!expo) return <p>Data tidak ditemukan.</p>;

  const relativeDate = getRelativeTimeRaw(expo.expo_created_at);
  const fullDate = getFullTimeRaw(expo.expo_created_at);

  return (
    <main className="xs:w-11/12 lg:w-10/12 flex flex-col mx-auto bg-background-primary py-8 gap-8">
      <section className="flex flex-col xs:gap-2">
        {/* Breadcrumb */}
        <Breadcrumbs
          itemClasses={{
            item: "data-[current=true]:text-primary-primary text-xs text-text-secondary",
          }}
        >
          <BreadcrumbItem href="/">Beranda</BreadcrumbItem>
          <BreadcrumbItem href="/expo">Expo</BreadcrumbItem>
          <BreadcrumbItem href={`/expo/${expo.expo_slug}`}>Detail Expo</BreadcrumbItem>
        </Breadcrumbs>

        <section className="flex flex-col xs:gap-4 md:gap-8">
          <div className="grid xs:grid-cols-1 xl:grid-cols-2 gap-4 ">
            {" "}
            {/* Image */}
            <Image
              src={expo.expo_img}
              alt={expo.expo_img}
              width={1280}
              height={720}
              loading="lazy"
              classNames={{ img: "!max-w-full !h-full aspect-video object-contain object-center !rounded-md", wrapper: "!max-w-full flex justify-center !rounded-md bg-background-primary" }}
            />
            <ScrollShadow size={20} className="flex flex-col items-start gap-2 w-full h-[512px] px-2 ">
              {/* User & Created at */}
              <div className="flex xs:flex-col xs:items-start sm:flex-row sm:justify-between  gap-2 w-full">
                <div className="flex items-center gap-1">
                  <Avatar src={expo.user_img} className="w-8 h-8" />
                  <div className="flex flex-col">
                    <span className="text-xs text-text-secondary">{expo.user_fullname}</span>
                    <span className="text-xs text-text-secondary">{expo.role_name}</span>
                  </div>
                </div>
                <div className="flex xs:flex-col xs:items-start sm:flex-row sm:justify-between   gap-2">
                  <Tooltip content={expo.expo_views.toLocaleString("id-ID")} placement="top" classNames={{ content: "text-xs text-background-primary bg-primary-primary" }}>
                    <div className="flex items-center gap-1">
                      <Eye size="20" color="currentColor" className="text-text-secondary" />
                      <span className="text-xs text-text-secondary"> {formatViews(expo.expo_views)} kali dilihat</span>
                    </div>
                  </Tooltip>
                  <Tooltip content={fullDate} placement="top" classNames={{ content: "text-xs text-background-primary bg-primary-primary" }}>
                    <div className="flex items-center gap-1">
                      <Calendar size="20" color="currentColor" className="text-text-secondary" />
                      <span className="text-xs text-text-secondary cursor-help">Diposting {relativeDate}</span>
                    </div>
                  </Tooltip>
                </div>
              </div>
              {/* Deskripsi */}
              <div className="flex flex-col gap-2 w-full">
                <span className="xs:text-sm md:text-2xl font-bold text-text-primary">{expo.expo_name}</span>
                <RichTextDisplay html={expo?.expo_desc} />
              </div>
            </ScrollShadow>
          </div>

          {/* Persyaratan dan Ketentuan */}
          <div className="grid grid-cols-1 gap-2 ">
            <span className="xs:text-sm md:text-base font-bold text-text-primary">Persyaratan dan Ketentuan</span>
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
              {/* Education */}
              <div className="flex flex-col  justify-center items-start  gap-1 group text-sm text-text-secondary">
                <span className="text-xs font-bold text-primary-primary">Jenjang Pendidikan</span>
                <div className="flex flex-wrap gap-1">
                  {((expo?.education_names as string) || "").split(",").map((item, index, arr) => (
                    <span key={index} className="text-xs text-text-secondary">
                      {item.trim()}
                      {index < arr.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>

              {/* Program Study */}
              <div className="flex flex-col  justify-center items-start  gap-1 group text-sm text-text-secondary">
                <span className="text-xs font-bold text-primary-primary">Program Studi</span>
                <div className="flex flex-wrap gap-1">
                  {((expo?.program_study_names as string) || "").split(",").map((item, index, arr) => (
                    <span key={index} className="text-xs text-text-secondary">
                      {item.trim()}
                      {index < arr.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div className="flex flex-col  justify-center items-start  gap-1 ">
                <span className="text-xs font-bold text-primary-primary ">Tipe Expo</span>
                <div className="flex flex-wrap gap-1">
                  {((expo?.expo_type_names as string) || "").split(",").map((item, index, arr) => (
                    <span key={index} className="text-xs text-text-secondary">
                      {item.trim()}
                      {index < arr.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>

              {/* Position */}
              <div className="flex flex-col  justify-center items-start  gap-1">
                <span className="text-xs font-bold text-primary-primary">Posisi yang dibutuhkan</span>
                <div className="flex flex-wrap gap-1">
                  {((expo?.position_names as string) || "").split(",").map((item, index, arr) => (
                    <span key={index} className="text-xs text-text-secondary">
                      {item.trim()}
                      {index < arr.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mode */}
              <div className="flex flex-col  justify-center items-start  gap-1">
                <span className="text-xs font-bold text-primary-primary">Mode Expo</span>
                <div className="flex flex-wrap gap-1">
                  {((expo?.mode_names as string) || "").split(",").map((item, index, arr) => (
                    <span key={index} className="text-xs text-text-secondary">
                      {item.trim()}
                      {index < arr.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>

              {/* Biaya*/}
              <div className="flex flex-col  justify-center items-start  gap-1">
                <span className="text-xs font-bold text-primary-primary">Biaya Kegiatan</span>
                <span className="text-xs text-text-secondary">{Number(expo?.expo_price) === 0 ? "Gratis" : `Rp. ${Number(expo?.expo_price).toLocaleString("id-ID")}`}</span>
              </div>
            </div>
          </div>

          {/* Detail Informasi */}
          <div className="flex flex-wrap items-start gap-2 ">
            {((expo.company_names as string) || "").split(",").map((tag, index) => (
              <Chip key={index} className="text-xs text-white bg-primary-primary border border-default-200">
                {tag.trim()}
              </Chip>
            ))}
          </div>

          {/* Waktu dan Wilayah */}
          <div className="grid grid-cols-1 gap-2 ">
            <span className="xs:text-sm md:text-base font-bold text-text-primary">Waktu dan Wilayah Penempatan</span>
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {/*  date */}
              <div className="flex flex-col  justify-center items-start gap-1">
                <span className="text-xs font-bold text-primary-primary">Waktu</span>
                <Tooltip content={getRelativeTimeRaw(expo.expo_date)} placement="top" classNames={{ content: "text-xs text-background-primary bg-primary-primary" }}>
                  <div className="flex items-center gap-1">
                    <Calendar size="20" color="currentColor" className="text-text-secondary" />
                    <span className="text-xs text-text-secondary cursor-help">{getFullTimeRaw(expo.expo_date)}</span>
                  </div>
                </Tooltip>
              </div>

              {/* Kota */}
              <div className="flex flex-col  justify-center items-start  gap-1">
                <span className="text-xs font-bold text-primary-primary">Kota</span>
                <div className="flex flex-wrap gap-1">
                  {((expo?.city_names as string) || "").split(",").map((item, index, arr) => (
                    <span key={index} className="text-xs text-text-secondary">
                      {item.trim()}
                      {index < arr.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>

              {/* Provinsi */}
              <div className="flex flex-col  justify-center items-start  gap-1">
                <span className="text-xs font-bold text-primary-primary">Provinsi</span>
                <div className="flex flex-wrap gap-1">
                  {((expo?.province_names as string) || "").split(",").map((item, index, arr) => (
                    <span key={index} className="text-xs text-text-secondary">
                      {item.trim()}
                      {index < arr.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>

              {/* Negara */}
              <div className="flex flex-col  justify-center items-start  gap-1">
                <span className="text-xs font-bold text-primary-primary">Negara</span>
                <div className="flex flex-wrap gap-1">
                  {((expo?.country_names as string) || "").split(",").map((item, index, arr) => (
                    <span key={index} className="text-xs text-text-secondary">
                      {item.trim()}
                      {index < arr.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Informasi Pendaftaran */}
          <div className="flex flex-col gap-2">
            <span className="xs:text-sm md:text-base font-bold text-text-primary">Informasi Pendaftaran</span>
            <div className="grid xs:grid-cols-1 md:grid-cols-3 justify-center items-start gap-2 ">
              {/* Open at */}
              <div className="flex flex-col  justify-center items-start gap-1">
                <span className="text-xs font-bold text-primary-primary">Pendaftaran Dibuka</span>
                <Tooltip content={getRelativeTimeRaw(expo?.expo_open_date)} placement="top" classNames={{ content: "text-xs text-background-primary bg-primary-primary" }}>
                  <div className="flex items-center gap-1">
                    <Calendar size="20" color="currentColor" className="text-text-secondary" />
                    <span className="text-xs text-text-secondary cursor-help">{getFullTimeRaw(expo?.expo_open_date)}</span>
                  </div>
                </Tooltip>
              </div>

              {/* Closed at */}
              <div className="flex flex-col  justify-center items-start gap-1">
                <span className="text-xs font-bold text-primary-primary">Pendaftaran Ditutup</span>
                <Tooltip content={getRelativeTimeRaw(expo?.expo_close_date)} placement="top" classNames={{ content: "text-xs text-background-primary bg-primary-primary" }}>
                  <div className="flex items-center gap-1">
                    <Calendar size="20" color="currentColor" className="text-text-secondary" />
                    <span className="text-xs text-text-secondary cursor-help">{getFullTimeRaw(expo?.expo_close_date)}</span>
                  </div>
                </Tooltip>
              </div>

              {/* Location  */}
              <div className="flex flex-col  justify-center items-start gap-1">
                <span className="text-xs font-bold text-primary-primary">Lokasi dan Link Pendaftaran</span>
                <div className="flex flex-col items-start gap-2 w-full">
                  <div className="flex items-start gap-2 ">
                    <div>
                      <Building size={20} color="currentColor" variant="TwoTone" className="text-text-secondary !w-5 !h-5" />
                    </div>
                    <span className="text-xs text-text-secondary">{expo?.expo_location}</span>
                  </div>
                  <Snippet size="sm" hideSymbol disableTooltip classNames={{ base: "w-full", pre: "text-xs text-text-secondary" }}>
                    {expo?.expo_link}
                  </Snippet>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Lainnya*/}
      <section className="flex flex-col gap-8 bg-background-primary ">
        <TitleSection label="Lainnya" href="/expo" />
        {/* Section Card */}
        <section className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xs:gap-2 lg:gap-8">
          {relatedExpos.length === 0 ? <p className="text-start text-xs text-text-secondary">Data belum tersedia</p> : relatedExpos.map((item) => <CardExpo key={item.expo_id} {...item} />)}
        </section>
      </section>
    </main>
  );
}
