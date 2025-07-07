"use client";
import React, { useState, useEffect } from "react";
import { Location, Tag, Calendar, Eye, Building } from "iconsax-react";
import { Avatar, Breadcrumbs, BreadcrumbItem, Image, Tooltip, Snippet, Spinner } from "@heroui/react";
import { getRelativeTimeRaw, getFullTimeRaw, getDateOnlyRaw } from "@/utils/time";
import { JobItem } from "@/types/job";
import TitleSection from "@/components/Custom/TitleSection";
import CardLowonganPekerjaan from "@/components/Card/CardLowonganPekerjaan";
import { formatViews } from "@/utils/view";
import RichTextDisplay from "@/components/Custom/RichTextDisplay";

import { getJobBySlug, getAllJobsExceptSlug, incrementJobView } from "@/services/job";

export default function PageLowonganPekerjaanDetail({ job_slug }: { job_slug: string }) {
  const [job, setJob] = useState<JobItem | null>(null);
  const [relatedJobs, setRelatedJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!job_slug) return;
        await incrementJobView(job_slug);

        const jobRes = await getJobBySlug(job_slug);
        if (jobRes.success && jobRes.data) {
          setJob(jobRes.data);
        } else {
          setJob(null);
        }

        const relatedRes = await getAllJobsExceptSlug(job_slug);
        if (relatedRes.success && relatedRes.data) {
          setRelatedJobs(relatedRes.data);
        } else {
          setRelatedJobs([]);
        }
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [job_slug]);

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
  if (!job) return <p>Data tidak ditemukan.</p>;

  const relativeDate = getRelativeTimeRaw(job.job_created_at);
  const fullDate = getFullTimeRaw(job.job_created_at);

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
          <BreadcrumbItem href="/lowongan-pekerjaan">Lowongan Pekerjaan</BreadcrumbItem>
          <BreadcrumbItem href={`/lowongan-pekerjaan/${job?.job_slug}`}>Detail Lowongan Pekerjaan</BreadcrumbItem>
        </Breadcrumbs>

        <section className="flex flex-col gap-8">
          {/* Company & Position */}
          <div className="flex items-center gap-2">
            {/* Company  */}
            <Image src={job?.company_img} alt={job?.company_name} width={72} height={72} className="object-contain" />
            <span className="xs:text-sm md:text-base font-bold">{job?.company_name}</span>
          </div>

          <Image
            alt={job?.job_img}
            src={job?.job_img}
            width={1280}
            height={720}
            loading="lazy"
            classNames={{ img: "!max-w-full !h-full aspect-video object-contain object-center rounded-md ", wrapper: "!max-w-full flex justify-center rounded-md bg-background-primary" }}
          />

          {/* User & Created at */}
          <div className="flex xs:flex-col xs:items-start sm:flex-row sm:justify-between sm:items-center  gap-2 ">
            <div className="flex items-center gap-1">
              <Avatar src={job?.user_img} className="w-8 h-8" />
              <div className="flex flex-col">
                <span className="text-xs text-text-secondary">{job?.user_fullname}</span>
                <span className="text-xs text-text-secondary">{job?.role_name}</span>
              </div>
            </div>
            <div className="flex xs:flex-col xs:items-start sm:flex-row sm:items-center gap-1">
              <Tooltip content={job?.job_views.toLocaleString("id-ID")} placement="top" classNames={{ content: "text-xs text-background-primary bg-primary-primary" }}>
                <div className="flex items-center gap-1">
                  <Eye size="20" color="currentColor" className="text-text-secondary" />
                  <span className="text-xs text-text-secondary"> {formatViews(job?.job_views)} kali dilihat</span>
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
            <span className="xs:text-sm md:text-2xl font-bold text-text-primary">{job?.job_name}</span>
            <RichTextDisplay html={job?.job_desc} />
          </div>

          {/* Persyaratan dan Ketentuan */}
          <div className="grid grid-cols-1 gap-2 ">
            <span className="xs:text-sm md:text-base font-bold text-text-primary">Persyaratan dan Ketentuan</span>
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
              {/* Age */}
              <div className="flex flex-col  justify-center items-start  gap-1 group text-sm text-text-secondary">
                <span className="text-xs font-bold text-primary-primary">Usia</span>
                <span className="text-xs ttext-text-secondary">
                  {job?.job_age_min} tahun - {job?.job_age_max} tahun
                </span>
              </div>

              {/* Height */}
              <div className="flex flex-col  justify-center items-start  gap-1 group text-sm text-text-secondary">
                <span className="text-xs font-bold text-primary-primary">Tinggi Badan</span>
                <span className="text-xs text-text-secondary">
                  {job?.job_height_min} cm - {job?.job_height_max} cm
                </span>
              </div>

              {/* Weight */}
              <div className="flex flex-col  justify-center items-start  gap-1 group text-sm text-text-secondary">
                <span className="text-xs font-bold text-primary-primary">Berat Badan</span>
                <span className="text-xs text-text-secondary">
                  {job?.job_weight_min} kg - {job?.job_weight_max} kg
                </span>
              </div>

              {/* Salary */}
              <div className="flex flex-col  justify-center items-start  gap-1">
                <span className="text-xs font-bold text-primary-primary">Rentang Gaji</span>
                <span className="text-xs text-text-secondary">
                  {`Rp. ${Number(job?.job_salary_min).toLocaleString("id-ID")}`} - {`Rp. ${Number(job?.job_salary_max).toLocaleString("id-ID")}`}
                </span>
              </div>

              {/* Gender */}
              <div className="flex flex-col  justify-center items-start  gap-1">
                <span className="text-xs font-bold text-primary-primary">Gender</span>
                <div className="flex flex-wrap gap-1">
                  {((job?.gender_names as string) || "").split(",").map((item, index, arr) => (
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
                  {((job?.religion_names as string) || "").split(",").map((item, index, arr) => (
                    <span key={index} className="text-xs text-text-secondary">
                      {item.trim()}
                      {index < arr.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>

              {/* Marital Status */}
              <div className="flex flex-col  justify-center items-start  gap-1 group text-sm text-text-secondary">
                <span className="text-xs font-bold text-primary-primary">Status Perkawinan</span>
                <div className="flex flex-wrap gap-1">
                  {((job?.marital_status_names as string) || "").split(",").map((item, index, arr) => (
                    <span key={index} className="text-xs text-text-secondary">
                      {item.trim()}
                      {index < arr.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="flex flex-col  justify-center items-start  gap-1">
                <span className="text-xs font-bold text-primary-primary">Pengalaman</span>
                <div className="flex flex-wrap gap-1">
                  {((job?.experience_names as string) || "").split(",").map((item, index, arr) => (
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
                  {((job?.education_names as string) || "").split(",").map((item, index, arr) => (
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
                  {((job?.program_study_names as string) || "").split(",").map((item, index, arr) => (
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
                <span className="text-xs text-text-secondary">{job?.ipk_no}</span>
              </div>

              {/* Type */}
              <div className="flex flex-col  justify-center items-start  gap-1 ">
                <span className="text-xs font-bold text-primary-primary ">Tipe Pekerjaan</span>
                <span className="text-xs text-text-secondary">{job?.job_type_name}</span>
              </div>

              {/* Posisi */}
              <div className="flex flex-col  justify-center items-start  gap-1">
                <span className="text-xs font-bold text-primary-primary">Posisi yang dibutuhkan</span>
                <div className="flex flex-wrap gap-1">
                  {((job?.position_names as string) || "").split(",").map((item, index, arr) => (
                    <span key={index} className="text-xs text-text-secondary">
                      {item.trim()}
                      {index < arr.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mode */}
              <div className="flex flex-col  justify-center items-start  gap-1">
                <span className="text-xs font-bold text-primary-primary">Mode Pekerjaan</span>
                <div className="flex flex-wrap gap-1">
                  {((job?.mode_names as string) || "").split(",").map((item, index, arr) => (
                    <span key={index} className="text-xs text-text-secondary">
                      {item.trim()}
                      {index < arr.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Wilayah Penempatan */}
          <div className="grid grid-cols-1 gap-2 ">
            <span className="xs:text-sm md:text-base font-bold text-text-primary">Wilayah Penempatan</span>
            <div className="grid xs:grid-cols-1 sm:grid-cols-3">
              {/* Kota */}
              <div className="flex flex-col  justify-center items-start  gap-1">
                <span className="text-xs font-bold text-primary-primary">Kota</span>
                <div className="flex flex-wrap gap-1">
                  {((job?.city_names as string) || "").split(",").map((item, index, arr) => (
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
                  {((job?.province_names as string) || "").split(",").map((item, index, arr) => (
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
                  {((job?.country_names as string) || "").split(",").map((item, index, arr) => (
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
                <Tooltip content={getRelativeTimeRaw(job?.job_open_date)} placement="top" classNames={{ content: "text-xs text-background-primary bg-primary-primary" }}>
                  <div className="flex items-center gap-1">
                    <Calendar size="20" color="currentColor" className="text-text-secondary" />
                    <span className="text-xs text-text-secondary cursor-help">{getFullTimeRaw(job?.job_open_date)}</span>
                  </div>
                </Tooltip>
              </div>

              {/* Closed at */}
              <div className="flex flex-col  justify-center items-start gap-1">
                <span className="text-xs font-bold text-primary-primary">Pendaftaran Ditutup</span>
                <Tooltip content={getRelativeTimeRaw(job?.job_close_date)} placement="top" classNames={{ content: "text-xs text-background-primary bg-primary-primary" }}>
                  <div className="flex items-center gap-1">
                    <Calendar size="20" color="currentColor" className="text-text-secondary" />
                    <span className="text-xs text-text-secondary cursor-help">{getFullTimeRaw(job?.job_close_date)}</span>
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
                    <span className="text-xs text-text-secondary">{job?.job_location}</span>
                  </div>
                  <Snippet size="sm" hideSymbol disableTooltip classNames={{ base: "w-full", pre: "text-xs text-text-secondary" }}>
                    {job?.job_link}
                  </Snippet>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
      {/* Lainnya*/}
      <section className="flex flex-col gap-8 bg-background-primary ">
        <TitleSection label="Lainnya" href="/job" />
        {/* Card */}
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xs:gap-2 lg:gap-8">
          {relatedJobs.length === 0 ? <p className="text-start text-xs text-text-secondary">Data belum tersedia</p> : relatedJobs.map((item) => <CardLowonganPekerjaan key={item.job_id} {...item} />)}
        </div>
      </section>
    </main>
  );
}
