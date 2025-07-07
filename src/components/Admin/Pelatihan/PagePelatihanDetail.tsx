"use client";
import React, { useState, useEffect } from "react";
import { Location, Tag, Calendar, Eye, Building } from "iconsax-react";
import { Avatar, Breadcrumbs, BreadcrumbItem, Image, Tooltip, ScrollShadow, Snippet, Spinner } from "@heroui/react";
import { getRelativeTimeRaw, getFullTimeRaw } from "@/utils/time";
import { TrainingItem } from "@/types/training";
import { formatViews } from "@/utils/view";
import { getTrainingBySlug, incrementTrainingView } from "@/services/training";
import RichTextDisplay from "@/components/Custom/RichTextDisplay";

export default function PagePelatihanDetail({ training_slug }: { training_slug: string }) {
  const [training, setTraining] = useState<TrainingItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!training_slug) return;
        await incrementTrainingView(training_slug);

        const trainingRes = await getTrainingBySlug(training_slug);
        if (trainingRes.success && trainingRes.data) {
          setTraining(trainingRes.data);
        } else {
          setTraining(null);
        }
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [training_slug]);

  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
        <Spinner
          label="Loading..."
          variant="wave"
          classNames={{
            label: "text-primary-primary mt-4",
            dots: "border-5 border-primary-primary",
          }}
        />
      </div>
    );
  if (!training)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
        <p>Data tidak ditemukan.</p>
      </div>
    );

  const relativeDate = getRelativeTimeRaw(training.training_created_at);
  const fullDate = getFullTimeRaw(training.training_created_at);

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
          <BreadcrumbItem href="/pelatihan">Pelatihan</BreadcrumbItem>
          <BreadcrumbItem href={`/pelatihan/${training.training_slug}`}>Detail Pelatihan</BreadcrumbItem>
        </Breadcrumbs>

        <section className="flex flex-col xs:gap-4 md:gap-8">
          {/* Company  */}
          <div className="flex items-center gap-2">
            <Image src={training?.company_img} alt={training?.company_name} width={32} height={32} className="object-contain" />
            <span className="xs:text-sm md:text-bas font-bold">{training?.company_name}</span>
          </div>
          <div className="grid xs:grid-cols-1 xl:grid-cols-2 gap-4 ">
            {" "}
            {/* Image */}
            <Image
              src={training.training_img}
              alt={training.training_img}
              width={1280}
              height={720}
              loading="lazy"
              classNames={{ img: "!max-w-full !h-full aspect-video object-contain object-center !rounded-md", wrapper: "!max-w-full flex justify-center !rounded-md bg-background-primary" }}
            />
            <ScrollShadow size={20} className="flex flex-col items-start gap-2 w-full h-[512px] px-2 ">
              {/* User & Created at */}
              <div className="flex xs:flex-col xs:items-start sm:flex-row sm:justify-between  gap-2 w-full">
                <div className="flex items-center gap-1">
                  <Avatar src={training.user_img} className="w-8 h-8" />
                  <div className="flex flex-col">
                    <span className="text-xs text-text-secondary">{training.user_fullname}</span>
                    <span className="text-xs text-text-secondary">{training.role_name}</span>
                  </div>
                </div>
                <div className="flex xs:flex-col xs:items-start sm:flex-row sm:justify-between   gap-2">
                  <Tooltip content={training.training_views.toLocaleString("id-ID")} placement="top" classNames={{ content: "text-xs text-background-primary bg-primary-primary" }}>
                    <div className="flex items-center gap-1">
                      <Eye size="20" color="currentColor" className="text-text-secondary" />
                      <span className="text-xs text-text-secondary"> {formatViews(training.training_views)} kali dilihat</span>
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
                <span className="xs:text-sm md:text-2xl font-bold text-text-primary">{training.training_name}</span>
                <RichTextDisplay html={training?.training_desc} />
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
                  {((training?.education_names as string) || "").split(",").map((item, index, arr) => (
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
                  {((training?.program_study_names as string) || "").split(",").map((item, index, arr) => (
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
                  {((training?.semester_nos as string) || "").split(",").map((item, index, arr) => (
                    <span key={index} className="text-xs text-text-secondary">
                      {item.trim()}
                      {index < arr.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div className="flex flex-col  justify-center items-start  gap-1 ">
                <span className="text-xs font-bold text-primary-primary ">Tipe Pelatihan</span>
                <div className="flex flex-wrap gap-1">
                  {((training?.training_type_names as string) || "").split(",").map((item, index, arr) => (
                    <span key={index} className="text-xs text-text-secondary">
                      {item.trim()}
                      {index < arr.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skill */}
              <div className="flex flex-col  justify-center items-start  gap-1">
                <span className="text-xs font-bold text-primary-primary">Skill</span>
                <div className="flex flex-wrap gap-1">
                  {((training?.skill_names as string) || "").split(",").map((item, index, arr) => (
                    <span key={index} className="text-xs text-text-secondary">
                      {item.trim()}
                      {index < arr.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mode */}
              <div className="flex flex-col  justify-center items-start  gap-1">
                <span className="text-xs font-bold text-primary-primary">Mode Pelatihan</span>
                <div className="flex flex-wrap gap-1">
                  {((training?.mode_names as string) || "").split(",").map((item, index, arr) => (
                    <span key={index} className="text-xs text-text-secondary">
                      {item.trim()}
                      {index < arr.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>

              {/* Biaya*/}
              <div className="flex flex-col  justify-center items-start  gap-1">
                <span className="text-xs font-bold text-primary-primary">Biaya pelatihan</span>
                {Number(training?.training_price) === 0 ? (
                  <span className="text-xs font-bold text-primary-primary">Gratis</span>
                ) : (
                  <span className="text-xs text-text-secondary">{`Rp. ${Number(training?.training_price).toLocaleString("id-ID")}`}</span>
                )}
              </div>
            </div>
          </div>

          {/* Waktu dan Wilayah */}
          <div className="grid grid-cols-1 gap-2 ">
            <span className="xs:text-sm md:text-base font-bold text-text-primary">Waktu dan Wilayah Penempatan</span>
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {/*  date */}
              <div className="flex flex-col  justify-center items-start gap-1">
                <span className="text-xs font-bold text-primary-primary">Waktu</span>
                <Tooltip content={getRelativeTimeRaw(training.training_date)} placement="top" classNames={{ content: "text-xs text-background-primary bg-primary-primary" }}>
                  <div className="flex items-center gap-1">
                    <Calendar size="20" color="currentColor" className="text-text-secondary" />
                    <span className="text-xs text-text-secondary cursor-help">{getFullTimeRaw(training.training_date)}</span>
                  </div>
                </Tooltip>
              </div>

              {/* Kota */}
              <div className="flex flex-col  justify-center items-start  gap-1">
                <span className="text-xs font-bold text-primary-primary">Kota</span>
                <div className="flex flex-wrap gap-1">
                  {((training?.city_names as string) || "").split(",").map((item, index, arr) => (
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
                  {((training?.province_names as string) || "").split(",").map((item, index, arr) => (
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
                  {((training?.country_names as string) || "").split(",").map((item, index, arr) => (
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
                <Tooltip content={getRelativeTimeRaw(training?.training_open_date)} placement="top" classNames={{ content: "text-xs text-background-primary bg-primary-primary" }}>
                  <div className="flex items-center gap-1">
                    <Calendar size="20" color="currentColor" className="text-text-secondary" />
                    <span className="text-xs text-text-secondary cursor-help">{getFullTimeRaw(training?.training_open_date)}</span>
                  </div>
                </Tooltip>
              </div>

              {/* Closed at */}
              <div className="flex flex-col  justify-center items-start gap-1">
                <span className="text-xs font-bold text-primary-primary">Pendaftaran Ditutup</span>
                <Tooltip content={getRelativeTimeRaw(training?.training_close_date)} placement="top" classNames={{ content: "text-xs text-background-primary bg-primary-primary" }}>
                  <div className="flex items-center gap-1">
                    <Calendar size="20" color="currentColor" className="text-text-secondary" />
                    <span className="text-xs text-text-secondary cursor-help">{getFullTimeRaw(training?.training_close_date)}</span>
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
                    <span className="text-xs text-text-secondary">{training?.training_location}</span>
                  </div>
                  <Snippet size="sm" hideSymbol disableTooltip classNames={{ base: "w-full", pre: "text-xs text-text-secondary" }}>
                    {training?.training_link}
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
