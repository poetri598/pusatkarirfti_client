"use client";
import React, { useEffect, useState } from "react";

// Iconsax
import { ArrowRight } from "iconsax-react";

// NextJS
import Image from "next/image";

// components
import { Spinner } from "@heroui/react";

// SwiperJS
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// types
import type { ExpoItem } from "@/types/expo";

// services
import { getThreeLatestExpos } from "@/services/expo";

// utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";

export default function SectionCarouselUser() {
  const [threeLatestExpo, setThreeLatestExpo] = useState<ExpoItem[]>([]);
  const [isLoadingThreeLatestExpo, setIsLoadingThreeLatestExpo] = useState(true);
  const [apiErrorThreeLatestExpo, setApiErrorThreeLatestExpo] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [createServiceFetcher(getThreeLatestExpos, setThreeLatestExpo, setApiErrorThreeLatestExpo, setIsLoadingThreeLatestExpo)];
      await Promise.all(fetchers.map((fetch) => fetch()));
    };

    fetchAll();
  }, []);
  return (
    <>
      <>
        <section className="mx-auto flex flex-col gradient-style overflow-hidden ">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            pagination={{
              clickable: true,
              el: ".custom-pagination-carousel",
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="xs:w-11/12 lg:w-10/12 mx-auto relative xs:!py-20 md:!py-32"
          >
            {isLoadingThreeLatestExpo ? (
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
            ) : apiErrorThreeLatestExpo ? (
              <p className="text-start text-xs text-danger-primary">{apiErrorThreeLatestExpo}</p>
            ) : threeLatestExpo.length === 0 ? (
              <p className="text-start text-xs text-text-secondary">Data belum tersedia</p>
            ) : (
              threeLatestExpo.map((item) => (
                <SwiperSlide key={item.expo_id}>
                  <div className="xs:w-11/12 lg:w-10/12 mx-auto p-4 bg-background-primary rounded-md">
                    <Image src={item.expo_img} width={1720} height={720} alt={item.expo_img} className="w-full h-full aspect-video object-cover rounded-md shadow shadow-default-200" />
                  </div>
                </SwiperSlide>
              ))
            )}
            <div className="w-full flex justify-between absolute z-10 xs:bottom-2 lg:bottom-1/2">
              <button className="custom-prev px-4 py-2 rounded-medium group bg-background-primary  disabled:opacity-30 ">
                <ArrowRight size="32" color="currentColor" className="rotate-180 text-primary-primary " />
              </button>
              <button className="custom-next px-4 py-2 rounded-medium group bg-background-primary  disabled:opacity-30">
                <ArrowRight size="32" color="currentColor" className="text-primary-primary  " />
              </button>
            </div>

            <div className="custom-pagination-carousel flex justify-center xs:gap-1 md:gap-4 my-4 [&_span]:bg-background-primary [&_span]:w-12 md:[&_span]:w-16 [&_span]:h-4 [&_span]:rounded-full [&_span]:transition-all [&_span]:duration-300 [&_span]:ease-in-out"></div>
          </Swiper>
        </section>
      </>
    </>
  );
}
