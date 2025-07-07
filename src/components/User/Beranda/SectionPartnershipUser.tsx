"use client";
import React, { useEffect, useState } from "react";

// NextJS
import Image from "next/image";

// Components
import TitleSection2 from "@/components/Custom/TitleSection2";
import type { CompanyItem } from "@/types/company";

// SwiperJS
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// types
import { Spinner } from "@heroui/react";

// utils
import { createFetcher } from "@/utils/createFetcher";

export default function SectionPartnershipUser() {
  const [companyIsPartner, setCompanyIsPartner] = useState<CompanyItem[]>([]);
  const [isLoadingCompanyIsPartner, setIsLoadingCompanyIsPartner] = useState(true);
  const [apiErrorCompanyIsPartner, setApiErrorCompanyIsPartner] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [createFetcher<CompanyItem[]>("/companies/is-partner", setCompanyIsPartner, setApiErrorCompanyIsPartner, setIsLoadingCompanyIsPartner)];
      await Promise.all(fetchers.map((fetch) => fetch()));
    };

    fetchAll();
  }, []);
  return (
    <>
      <>
        <section className="mx-auto flex flex-col gap-8 py-8 bg-background-primary  overflow-hidden">
          <TitleSection2 label="Partner Kami" />
          <div className="w-full overflow-hidden ">
            <Swiper
              loop={companyIsPartner.length > 6}
              modules={[Autoplay]}
              spaceBetween={20}
              breakpoints={{ 1280: { slidesPerView: 6 }, 1024: { slidesPerView: 5 }, 768: { slidesPerView: 4 }, 640: { slidesPerView: 3 }, 300: { slidesPerView: 2 } }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              className="w-full relative"
            >
              {isLoadingCompanyIsPartner ? (
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
              ) : apiErrorCompanyIsPartner ? (
                <p className="text-start text-xs text-danger-primary">{apiErrorCompanyIsPartner}</p>
              ) : companyIsPartner.length === 0 ? (
                <p className="text-start text-xs text-text-secondary">Data belum tersedia</p>
              ) : (
                companyIsPartner.map((item) => (
                  <SwiperSlide key={item.company_id}>
                    <Image src={item.company_img} width={1280} height={720} alt={item.company_img} className="aspect-square w-full h-full rounded-md object-contain" />
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>
        </section>
      </>
    </>
  );
}
