"use client";
import React, { ComponentType, useState, useEffect } from "react";

// Components
import TitleAuth from "./TitleAuth";
import CardLowonganPekerjaan from "@/components/Card/CardLowonganPekerjaan";
import CardMagang from "@/components/Card/CardMagang";
import CardPelatihan from "@/components/Card/CardPelatihan";
import { Spinner } from "@heroui/react";

// SwiperJS
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Types
import { JobItem } from "@/types/job";
import { TrainingItem } from "@/types/training";
import { InternshipItem } from "@/types/internship";

// services
import { getJobAll } from "@/services/job";
import { getInternshipAll } from "@/services/internship";
import { getTrainingAll } from "@/services/training";

// utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";

type Slide = {
  key: string;
  titles: [{ title: string; desc: string }];
  Card: ComponentType<any>;
  data: any[];
};

export default function SectionCarouselMasuk() {
  // jobs
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [apiErrorJobs, setApiErrorJobs] = useState<string | null>(null);
  // internships
  const [internships, setInternships] = useState<InternshipItem[]>([]);
  const [isLoadingInternships, setIsLoadingInternships] = useState(true);
  const [apiErrorInternships, setApiErrorInternships] = useState<string | null>(null);
  // trainings
  const [trainings, setTrainings] = useState<TrainingItem[]>([]);
  const [isLoadingTrainings, setIsLoadingTrainings] = useState(true);
  const [apiErrorTrainings, setApiErrorTrainings] = useState<string | null>(null);

  const isLoading = isLoadingJobs || isLoadingInternships || isLoadingTrainings;

  const apiError = apiErrorJobs || apiErrorInternships || apiErrorTrainings;

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [
        createServiceFetcher(getJobAll, setJobs, setApiErrorJobs, setIsLoadingJobs),
        createServiceFetcher(getInternshipAll, setInternships, setApiErrorInternships, setIsLoadingInternships),
        createServiceFetcher(getTrainingAll, setTrainings, setApiErrorTrainings, setIsLoadingTrainings),
      ];
      await Promise.all(fetchers.map((fetch) => fetch()));
    };

    fetchAll();
  }, []);

  if (isLoading)
    return (
      <div className="w-full min-h-screen flex justify-center items-center py-8">
        <Spinner
          label="Sedang memuat data"
          labelColor="primary"
          variant="dots"
          classNames={{
            label: "text-primary-primary mt-4",
            dots: "border-5 border-primary-primary",
          }}
        />
      </div>
    );

  if (apiError) return <p className="text-center py-8 text-red-500">{apiError}</p>;

  const mainJob = jobs.slice(0, 1);
  const mainInternship = internships.slice(0, 1);
  const mainTraining = trainings.slice(0, 1);

  const slides: Slide[] = [
    {
      key: "pekerjaan",
      titles: [{ title: "Ayo wujudkan impianmu sekarang!", desc: "Temukan pekerjaan impianmu bersama kami Pusat Karir Fakultas Teknologi Informasi Universitas Sebelas April " }],
      Card: CardLowonganPekerjaan,
      data: mainJob,
    },
    { key: "magang", titles: [{ title: "Tingkatkan pengalamanmu sekarang!", desc: "Ikuti kegiatan magang bersama kami Pusat Karir Fakultas Teknologi Informasi Universitas Sebelas April " }], Card: CardMagang, data: mainInternship },
    {
      key: "pelatihan",
      titles: [{ title: "Tambahkan keahlianmu sekarang!", desc: "Ikuti pelatihan dalam mengembangkan keterampilanmu bersama kami Pusat Karir Fakultas Teknologi Informasi Universitas Sebelas April " }],
      Card: CardPelatihan,
      data: mainTraining,
    },
  ];
  return (
    <>
      <>
        <section className="xs:w-11/12 mx-auto flex flex-col  overflow-hidden py-8 ">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{
              clickable: true,
              el: ".custom-pagination-carousel",
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="w-full  mx-auto relative "
          >
            {slides.map(({ key, Card, data }) => (
              <SwiperSlide key={key} className="!flex flex-col justify-center items-center xs:gap-8 md:gap-16 ">
                {slides
                  .find((slide) => slide.key === key)
                  ?.titles.map((title, index) => (
                    <TitleAuth key={index} title={title.title} desc={title.desc} />
                  ))}

                <div className="xs:w-full md:w-10/12 min-h-[200px] flex justify-center items-center px-8">
                  {data.length === 0 ? (
                    <p className="text-center text-xs text-text-secondary">Data belum tersedia</p>
                  ) : (
                    <div className="w-full grid xs:grid-cols-1 md:gap-4">
                      {data.map((item, index) => (
                        <Card key={index} {...item} />
                      ))}
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}

            <div className="custom-pagination-carousel flex justify-center xs:gap-1 md:gap-4 my-4 [&_span]:bg-background-primary [&_span]:w-12 md:[&_span]:w-16 [&_span]:h-4 [&_span]:rounded-full [&_span]:transition-all [&_span]:duration-300 [&_span]:ease-in-out"></div>
          </Swiper>
        </section>
      </>
    </>
  );
}
