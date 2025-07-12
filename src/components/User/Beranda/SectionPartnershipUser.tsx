"use client";
import React, { useEffect, useState } from "react";

// NextJS
import Image from "next/image";

// Components
import TitleSection2 from "@/components/Custom/TitleSection2";
import { Spinner } from "@heroui/react";

// SwiperJS
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// types
import type { CompanyItem } from "@/types/company";

// services
import { getPartnerCompanies } from "@/services/company";

// utils
import { createServiceFetcher } from "@/utils/createServiceFetcher";

export default function SectionPartnershipUser() {
  const [partnerCompanies, setPartnerCompanies] = useState<CompanyItem[]>([]);
  const [isLoadingPartnerCompanies, setIsLoadingPartnerCompanies] = useState(true);
  const [apiErrorPartnerCompanies, setApiErrorPartnerCompanies] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const fetchers = [createServiceFetcher(getPartnerCompanies, setPartnerCompanies, setApiErrorPartnerCompanies, setIsLoadingPartnerCompanies)];
      await Promise.all(fetchers.map((fetch) => fetch()));
    };

    fetchAll();
  }, []);

  return (
    <section className="mx-auto flex flex-col gap-8 py-8 bg-background-primary overflow-hidden">
      <TitleSection2 label="Partner Kami" />
      <div className="w-full overflow-hidden">
        {isLoadingPartnerCompanies ? (
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
        ) : apiErrorPartnerCompanies ? (
          <p className="text-start text-xs text-danger-primary">{apiErrorPartnerCompanies}</p>
        ) : partnerCompanies.length === 0 ? (
          <p className="text-start text-xs text-text-secondary">Data belum tersedia</p>
        ) : partnerCompanies.length < 6 ? (
          <div className="flex flex-wrap justify-center items-center gap-6 py-4">
            {partnerCompanies.map((item) => (
              <div key={item.company_id} className="flex justify-center items-center w-32 h-32 bg-white rounded-md">
                <Image src={item.company_img} width={128} height={128} alt={item.company_img} className="object-contain max-h-full max-w-full" />
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            loop={true}
            modules={[Autoplay]}
            spaceBetween={20}
            breakpoints={{
              1280: { slidesPerView: 6 },
              1024: { slidesPerView: 5 },
              768: { slidesPerView: 4 },
              640: { slidesPerView: 3 },
              300: { slidesPerView: 2 },
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="w-full relative"
          >
            {partnerCompanies.map((item) => (
              <SwiperSlide key={item.company_id}>
                <div className="flex justify-center items-center w-full h-32 bg-white rounded-md">
                  <Image src={item.company_img} width={128} height={128} alt={item.company_img} className="object-contain max-h-full max-w-full" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
