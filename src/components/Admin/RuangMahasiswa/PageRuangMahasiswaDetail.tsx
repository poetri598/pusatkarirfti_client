"use client";
import React, { useState, useEffect } from "react";

// Iconsax
import { ArrowRight } from "iconsax-react";

// NextJS
import Image from "next/image";

// Components
import TitleSectionAdmin from "@/components/Custom/TitleSectionAdmin";
import { Spinner, Breadcrumbs, BreadcrumbItem } from "@heroui/react";

// SwiperJS
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// types
import type { StudentRoomItem } from "@/types/studentRoom";

// services
import { getStudentRoomById } from "@/services/studentRoom";

export default function SectionRuangMahasiswaUser({ student_room_id }: { student_room_id: number }) {
  const [student_room, setStudentRoom] = useState<StudentRoomItem | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchAll = async () => {
      try {
        const { success, data, error } = await getStudentRoomById(student_room_id);
        if (success && data) {
          setStudentRoom(data);
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchAll();
  }, []);

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

  if (!student_room) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
        <p>Data tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <>
      <>
        <section className="w-full mx-auto flex flex-col gap-4 xs:p-0 md:p-8 bg-background-primary overflow-hidden">
          {/* Breadcrumb */}
          <Breadcrumbs
            itemClasses={{
              item: "data-[current=true]:text-primary-primary text-xs",
            }}
          >
            <BreadcrumbItem href="/">Beranda</BreadcrumbItem>
            <BreadcrumbItem href="/ruang-mahasiswa">Ruang Mahasiswa</BreadcrumbItem>
            <BreadcrumbItem href={`/ruang-mahasiswa/${student_room_id}`}>Detail Ruang Mahasiswa</BreadcrumbItem>
          </Breadcrumbs>

          <TitleSectionAdmin label="Detail Ruang Mahasiswa" />

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
              el: ".custom-pagination-studentroom",
              bulletClass: "swiper-pagination-bullet",
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="xs:w-11/12 relative"
          >
            <SwiperSlide key={student_room.student_room_id}>
              <div className="grid xs:grid-cols-1 xl:grid-cols-2 xs:gap-2 md:gap-8 ">
                <div className="flex flex-col items-start justify-center xs:gap-2 md:gap-8 ">
                  <span className="xs:text-base md:text-4xl font-bold text-text-primary">{student_room.student_room_name}</span>
                  <p className="text-xs text-text-secondary text-justify line-clamp-6">{student_room.student_room_desc}</p>
                </div>
                <div className="relative flex rounded-md overflow-hidden xs:order-first xl:order-none">
                  <Image src={student_room.student_room_img} width={1280} height={720} alt={student_room.student_room_img} className="aspect-video w-full h-full object-cover rounded-md shadow-lg p-2 bg-background-primary" />
                  <div className="absolute xs:bottom-6 xl:bottom-12 left-0 right-0  mx-auto w-10/12">
                    <div className="flex flex-col p-4 bg-background-primary rounded-md gap-1 ">
                      {" "}
                      <span className="xs:text-base md:text-2xl font-bold text-text-primary">{student_room.user_fullname}</span>
                      <span className="xs:text-xs md:text-xs text-text-primary flex gap-2">
                        <span className="text-text-secondary">{student_room.current_position_name}</span> | <span className="text-primary-primary">{student_room.current_company_name}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <div className="grid xs:grid-cols-1 xl:grid-cols-2 xs:gap-2 xl:gap-8 xs:relative xl:absolute z-10 bottom-0 left-0 right-0">
              {/* Next & Prev */}
              <div className="flex xs:justify-between xl:justify-start w-full xs:gap-2 md:gap-8 ">
                <button className={"custom-prev px-4 py-2 rounded-md xs:text-background-primary   xl:text-primary-primary xs:bg-primary-primary xl:bg-background-primary hover:bg-default-200 disabled:opacity-30"}>
                  <ArrowRight size="32" color="currentColor" className="rotate-180" />
                </button>
                <button className="custom-next px-4 py-2 rounded-md xs:text-background-primary   xl:text-primary-primary xs:bg-primary-primary xl:bg-background-primary hover:bg-default-200 disabled:opacity-30">
                  <ArrowRight size="32" color="currentColor" />
                </button>
              </div>

              {/* Pagination */}
              <div className="custom-pagination-studentroom gap-1 mx-auto  flex xs:justify-center xl:justify-end xs:w-full xl:!w-10/12  py-2 xs:order-first xl:order-none  [&_span]:xs:bg-primary-border [&_span]:xl:bg-background-primary [&_span]:w-12 md:[&_span]:w-16 [&_span]:h-4 [&_span]:rounded-full [&_span]:transition-all [&_span]:duration-300 [&_span]:ease-in-out [&_span.swiper-pagination-bullet-active]:xs:bg-primary-primary [&_span.swiper-pagination-bullet-active]:xl:bg-background-primary ">
                {" "}
              </div>
            </div>
          </Swiper>
        </section>
      </>
    </>
  );
}
