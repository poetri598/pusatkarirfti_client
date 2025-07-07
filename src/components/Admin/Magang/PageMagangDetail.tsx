"use client";
import React, { useState, useEffect } from "react";
import { Calendar, Eye, Building } from "iconsax-react";
import { Avatar, Breadcrumbs, BreadcrumbItem, Image, Tooltip, Snippet, Spinner } from "@heroui/react";
import { getRelativeTimeRaw, getFullTimeRaw, getDateOnlyRaw, getDurationRaw } from "@/utils/time";
import { InternshipItem } from "@/types/internship";
import { formatViews } from "@/utils/view";
import RichTextDisplay from "@/components/Custom/RichTextDisplay";

import { getInternshipBySlug, incrementInternshipView } from "@/services/internship";

export default function PageLowonganMagangDetail({ internship_slug }: { internship_slug: string }) {
  const [internship, setinternship] = useState<InternshipItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!internship_slug) return;
        await incrementInternshipView(internship_slug);

        const internshipRes = await getInternshipBySlug(internship_slug);
        if (internshipRes.success && internshipRes.data) {
          setinternship(internshipRes.data);
        } else {
          setinternship(null);
        }
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [internship_slug]);

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
  if (!internship) return <p>Data tidak ditemukan.</p>;

  const relativeDate = getRelativeTimeRaw(internship.internship_created_at);
  const fullDate = getFullTimeRaw(internship.internship_created_at);

  return (
    <main className="xs:p-0 md:p-8  flex flex-col xs:gap-2 md:gap-8 overflow-hidden">
      <section className="flex flex-col xs:gap-2">
        {/* Breadcrumb */}
        <Breadcrumbs
          itemClasses={{
            item: "data-[current=true]:text-primary-primary text-xs text-text-secondary",
          }}
        >
          <BreadcrumbItem href="/">Beranda</BreadcrumbItem>
          <BreadcrumbItem href="/magang">Magang</BreadcrumbItem>
          <BreadcrumbItem href={`/magang/${internship?.internship_slug}`}>Detail Magang</BreadcrumbItem>
        </Breadcrumbs>

        <section className="flex flex-col gap-8">
          {/* Company  */}
          <div className="flex items-center gap-2">
            <Image src={internship?.company_img} alt={internship?.company_name} width={72} height={72} className="object-contain" />
            <span className="xs:text-sm md:text-base font-bold">{internship?.company_name}</span>
          </div>

          <Image
            alt={internship?.internship_img}
            src={internship?.internship_img}
            width={1280}
            height={720}
            loading="lazy"
            classNames={{ img: "!max-w-full !h-full aspect-video object-contain object-center rounded-md ", wrapper: "!max-w-full flex justify-center rounded-md bg-background-primary" }}
          />

          {/* User & Created at */}
          <div className="flex xs:flex-col xs:items-start sm:flex-row sm:justify-between sm:items-center  gap-2 ">
            <div className="flex items-center gap-1">
              <Avatar src={internship?.user_img} className="w-8 h-8" />
              <div className="flex flex-col">
                <span className="text-xs text-text-secondary">{internship?.user_fullname}</span>
                <span className="text-xs text-text-secondary">{internship?.role_name}</span>
              </div>
            </div>
            <div className="flex xs:flex-col xs:items-start sm:flex-row sm:items-center gap-1">
              <Tooltip content={internship?.internship_views.toLocaleString("id-ID")} placement="top" classNames={{ content: "text-xs text-background-primary bg-primary-primary" }}>
                <div className="flex items-center gap-1">
                  <Eye size="20" color="currentColor" className="text-text-secondary" />
                  <span className="text-xs text-text-secondary"> {formatViews(internship?.internship_views)} kali dilihat</span>
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
          <div className="flex flex-col gap-2">
            <span className="xs:text-sm md:text-2xl font-bold text-text-primary">{internship?.internship_name}</span>
            <RichTextDisplay html={internship?.internship_desc} />
          </div>

          {/* Persyaratan dan Ketentuan */}
          <div className="grid grid-cols-1 gap-2 ">
            <span className="xs:text-sm md:text-base font-bold text-text-primary">Persyaratan dan Ketentuan</span>
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
              {/* Gender */}
              <div className="flex flex-col  justify-center items-start  gap-1">
                <span className="text-xs font-bold text-primary-primary">Gender</span>
                <div className="flex flex-wrap gap-1">
                  {((internship?.gender_names as string) || "").split(",").map((item, index, arr) => (
                    <span key={index} className="text-xs text-text-secondary">
                      {item.trim()}
                      {index < arr.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>

              {/* Religion */}
              <div className="flex flex-col  justify-center items-start  gap-1">
                <span className="text-xs font-bold text-primary-primary">Agama</span>
                <div className="flex flex-wrap gap-1">
                  {((internship?.religion_names as string) || "").split(",").map((item, index, arr) => (
                    <span key={index} className="text-xs text-text-secondary">
                      {item.trim()}
                      {index < arr.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="flex flex-col  justify-center items-start  gap-1 group text-sm text-text-secondary">
                <span className="text-xs font-bold text-primary-primary">Jenjang Pendidikan</span>
                <div className="flex flex-wrap gap-1">
                  {((internship?.education_names as string) || "").split(",").map((item, index, arr) => (
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
                  {((internship?.program_study_names as string) || "").split(",").map((item, index, arr) => (
                    <span key={index} className="text-xs text-text-secondary">
                      {item.trim()}
                      {index < arr.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>

              {/* Semester */}
              <div className="flex flex-col  justify-center items-start  gap-1 group text-sm text-text-secondary">
                <span className="text-xs font-bold text-primary-primary">Semester</span>
                <div className="flex flex-wrap gap-1">
                  {((internship?.semester_nos as string) || "").split(",").map((item, index, arr) => (
                    <span key={index} className="text-xs text-text-secondary">
                      {item.trim()}
                      {index < arr.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>

              {/* IPK */}
              <div className="flex flex-col  justify-center items-start  gap-1 group text-sm text-text-secondary">
                <span className="text-xs font-bold text-primary-primary">IPK Minimal</span>
                <span className="text-xs text-text-secondary">{internship?.ipk_no}</span>
              </div>

              {/* Type */}
              <div className="flex flex-col  justify-center items-start  gap-1 ">
                <span className="text-xs font-bold text-primary-primary ">Tipe Magang</span>
                <span className="text-xs text-text-secondary">{internship?.internship_type_name}</span>
              </div>

              {/* Posisi */}
              <div className="flex flex-col  justify-center items-start  gap-1">
                <span className="text-xs font-bold text-primary-primary">Posisi Magang</span>
                <div className="flex flex-wrap gap-1">
                  {((internship?.position_names as string) || "").split(",").map((item, index, arr) => (
                    <span key={index} className="text-xs text-text-secondary">
                      {item.trim()}
                      {index < arr.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mode */}
              <div className="flex flex-col  justify-center items-start  gap-1">
                <span className="text-xs font-bold text-primary-primary">Mode Magang</span>
                <div className="flex flex-wrap gap-1">
                  {((internship?.mode_names as string) || "").split(",").map((item, index, arr) => (
                    <span key={index} className="text-xs text-text-secondary">
                      {item.trim()}
                      {index < arr.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Waktu dan Wilayah */}
          <div className="grid grid-cols-1 gap-2 ">
            <span className="xs:text-sm md:text-base font-bold text-text-primary">Waktu dan Wilayah Penempatan</span>
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {/* Durasi */}
              <div className="flex flex-col  justify-center items-start gap-1">
                <span className="text-xs font-bold text-primary-primary">Periode Magang</span>
                <Tooltip content={getDurationRaw(internship?.internship_start_date, internship?.internship_end_date)} placement="top" classNames={{ content: "text-xs text-background-primary bg-primary-primary" }}>
                  <div className="flex items-center gap-1">
                    <Calendar size="20" color="currentColor" className="text-text-secondary" />
                    <span className="text-xs text-text-secondary cursor-help">{getDateOnlyRaw(internship?.internship_start_date)}</span> -{" "}
                    <span className="text-xs text-text-secondary cursor-help">{getDateOnlyRaw(internship?.internship_end_date)}</span>
                  </div>
                </Tooltip>
              </div>
              {/* Kota */}
              <div className="flex flex-col  justify-center items-start  gap-1">
                <span className="text-xs font-bold text-primary-primary">Kota</span>
                <div className="flex flex-wrap gap-1">
                  {((internship?.city_names as string) || "").split(",").map((item, index, arr) => (
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
                  {((internship?.province_names as string) || "").split(",").map((item, index, arr) => (
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
                  {((internship?.country_names as string) || "").split(",").map((item, index, arr) => (
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
                <Tooltip content={getRelativeTimeRaw(internship?.internship_open_date)} placement="top" classNames={{ content: "text-xs text-background-primary bg-primary-primary" }}>
                  <div className="flex items-center gap-1">
                    <Calendar size="20" color="currentColor" className="text-text-secondary" />
                    <span className="text-xs text-text-secondary cursor-help">{getFullTimeRaw(internship?.internship_open_date)}</span>
                  </div>
                </Tooltip>
              </div>

              {/* Closed at */}
              <div className="flex flex-col  justify-center items-start gap-1">
                <span className="text-xs font-bold text-primary-primary">Pendaftaran Ditutup</span>
                <Tooltip content={getRelativeTimeRaw(internship?.internship_close_date)} placement="top" classNames={{ content: "text-xs text-background-primary bg-primary-primary" }}>
                  <div className="flex items-center gap-1">
                    <Calendar size="20" color="currentColor" className="text-text-secondary" />
                    <span className="text-xs text-text-secondary cursor-help">{getFullTimeRaw(internship?.internship_close_date)}</span>
                  </div>
                </Tooltip>
              </div>

              {/* Location  */}
              <div className="flex flex-col  justify-center items-start gap-1">
                <span className="text-xs font-bold text-primary-primary">Lokasi dan Link Pendaftaran</span>
                <div className="flex flex-col items-start gap-2 w-full">
                  <div className="flex items-center gap-1 ">
                    {" "}
                    <Building size="20" color="currentColor" variant="TwoTone" className="text-text-secondary" />
                    <span className="text-xs text-text-secondary">{internship?.internship_location}</span>
                  </div>
                  <Snippet size="sm" hideSymbol disableTooltip classNames={{ base: "w-full", pre: "text-xs text-text-secondary" }}>
                    {internship?.internship_link}
                  </Snippet>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
