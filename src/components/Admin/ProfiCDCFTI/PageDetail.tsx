"use client";
import React, { useState, useEffect } from "react";

// Components
import { Breadcrumbs, BreadcrumbItem, Spinner, Image } from "@heroui/react";
import RichTextDisplay from "@/components/Custom/RichTextDisplay";

// Types
import { ProfilCdcFtiItem } from "@/types/profilCdcFti";

// Services
import { getProfilCdcFtiById } from "@/services/profilCdcFti";

export default function page({ profil_cdc_fti_id }: { profil_cdc_fti_id: number }) {
  const [data, setData] = useState<ProfilCdcFtiItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { success, data, error } = await getProfilCdcFtiById(profil_cdc_fti_id);
        if (success && data) {
          setData(data);
        } else {
          setData(null);
        }
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [profil_cdc_fti_id]);

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
  if (!data)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
        <p>Data tidak ditemukan.</p>
      </div>
    );

  return (
    <>
      <main>
        {/* Breadcrumb */}
        <Breadcrumbs
          itemClasses={{
            item: "data-[current=true]:text-primary-primary text-xs text-text-secondary",
          }}
        >
          <BreadcrumbItem href="/">Beranda</BreadcrumbItem>
          <BreadcrumbItem href="/profil-cdc-fti">Profil CDC FTI</BreadcrumbItem>
          <BreadcrumbItem href={`/profil-cdc-fti/${profil_cdc_fti_id}`}>Detail Profil CDC FTI</BreadcrumbItem>
        </Breadcrumbs>
        {/* Section Tentang */}
        <div className="w-full mx-auto flex flex-col gap-4 xs:p-0 md:p-8 bg-background-primary overflow-hidden">
          {""}
          <div className=" grid xs:grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="group flex flex-col gap-2 text-3xl font-bold">
              <span className="xs:text-xl sm:text-4xl">Tempat terbaik Untuk</span>
              <div className="flex gap-2">
                {" "}
                <div className="relative z-10 w-fit">
                  <span className=" relative z-10 xs:text-xl sm:text-4xl  text-primary-primary font-bold ">Berkembang</span>
                  <div className="absolute top-1/2 w-3/5 h-1/2 bg-secondary-primary"></div>
                </div>
                &
                <div className="relative z-10 w-fit">
                  <span className=" relative xs:text-xl sm:text-4xl z-10  text-primary-primary font-bold ">Tumbuh</span>
                  <div className="absolute top-1/2 right-0 w-3/5 h-1/2 bg-secondary-primary"></div>
                </div>
              </div>
            </div>
            <RichTextDisplay html={data.profil_cdc_fti_firstname} />
          </div>
          <div className="flex flex-col gap-4 items-center">
            <Image
              src={data.profil_cdc_fti_img}
              alt={data.profil_cdc_fti_img}
              width={1280}
              height={720}
              loading="lazy"
              classNames={{ img: "!max-w-full !h-full aspect-video object-contain object-center rounded-md ", wrapper: "!max-w-full flex justify-center rounded-md bg-background-primary" }}
            />
            <RichTextDisplay html={data.profil_cdc_fti_lastname} />
          </div>
        </div>

        {/* Section Visi */}
        <section className="w-full mx-auto flex flex-col gap-4 xs:p-0 md:p-8 bg-background-primary overflow-hidden">
          <div className="flex flex-col gap-4 items-start">
            <div className="relative z-10 w-fit">
              <span className=" relative z-10 xs:text-xl sm:text-4xl text-primary-primary font-bold ">Visi</span>
              <div className="absolute top-1/2  w-3/5 h-1/2 bg-secondary-primary"></div>
            </div>
            <div className=" grid xs:grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <Image
                src={data.profil_cdc_fti_vision_img}
                alt={data.profil_cdc_fti_vision_img}
                width={1280}
                height={720}
                loading="lazy"
                classNames={{ img: "!max-w-full !h-full aspect-video object-contain object-center rounded-md ", wrapper: "!max-w-full flex justify-center rounded-md bg-background-primary" }}
              />
              <RichTextDisplay html={data.profil_cdc_fti_vision_name} />
            </div>
          </div>
        </section>

        {/* Section Misi */}
        <section className="w-full mx-auto flex flex-col gap-4 xs:p-0 md:p-8 bg-background-primary overflow-hidden">
          {" "}
          <div className="flex flex-col gap-4 items-end">
            {" "}
            <div className="relative z-10 w-fit">
              <p className=" relative z-10 xs:text-xl sm:text-4xl text-primary-primary font-bold text-end ">Misi</p>
              <div className="absolute top-1/2 right-0  w-3/5 h-1/2 bg-secondary-primary"></div>
            </div>
            <div className=" grid xs:grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <RichTextDisplay html={data.profil_cdc_fti_mission_name} />
              <Image
                src={data.profil_cdc_fti_mission_img}
                alt={data.profil_cdc_fti_mission_img}
                width={1280}
                height={720}
                loading="lazy"
                classNames={{ img: "!max-w-full !h-full aspect-video object-contain object-center rounded-md ", wrapper: "!max-w-full flex justify-center rounded-md bg-background-primary" }}
              />
            </div>
          </div>
        </section>

        {/* Section Tujuan */}
        <section className="w-full mx-auto flex flex-col gap-4 xs:p-0 md:p-8 bg-background-primary overflow-hidden">
          <div className="flex flex-col gap-4 items-start">
            <div className="relative z-10 w-fit">
              <p className=" relative z-10 xs:text-xl sm:text-4xl text-primary-primary font-bold ">Tujuan</p>
              <div className="absolute top-1/2  w-3/5 h-1/2 bg-secondary-primary"></div>
            </div>
            <div className=" grid xs:grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <Image
                src={data.profil_cdc_fti_benefit_img}
                alt={data.profil_cdc_fti_goal_name}
                width={1280}
                height={720}
                loading="lazy"
                classNames={{ img: "!max-w-full !h-full aspect-video object-contain object-center rounded-md ", wrapper: "!max-w-full flex justify-center rounded-md bg-background-primary" }}
              />
              <RichTextDisplay html={data.profil_cdc_fti_goal_name} />
            </div>
          </div>
        </section>

        {/* Section Manfaat */}
        <section className="w-full mx-auto flex flex-col gap-4 xs:p-0 md:p-8 bg-background-primary overflow-hidden">
          {" "}
          <div className="flex flex-col gap-4 items-end">
            {" "}
            <div className="relative z-10 w-fit">
              <p className=" relative z-10 xs:text-xl sm:text-4xl text-primary-primary font-bold text-end ">Manfaat</p>
              <div className="absolute top-1/2 right-0  w-3/5 h-1/2 bg-secondary-primary"></div>
            </div>
            <div className=" grid xs:grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <RichTextDisplay html={data.profil_cdc_fti_benefit_name} />
              <Image
                src={data.profil_cdc_fti_benefit_img}
                alt={data.profil_cdc_fti_benefit_img}
                width={1280}
                height={720}
                loading="lazy"
                classNames={{ img: "!max-w-full !h-full aspect-video object-contain object-center rounded-md ", wrapper: "!max-w-full flex justify-center rounded-md bg-background-primary" }}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
