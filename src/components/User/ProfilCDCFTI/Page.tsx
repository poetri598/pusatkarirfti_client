"use client";
import React, { useState, useEffect } from "react";

// Components
import HeroTentangKami from "@/components/Custom/HeroTentangKami";
import { Spinner, Image } from "@heroui/react";
import RichTextDisplay from "@/components/Custom/RichTextDisplay";
import PartnershipSection from "@/components/User/Beranda/SectionPartnershipUser";

// Types
import { ProfilCdcFtiItem } from "@/types/profilCdcFti";

// Services
import { getProfilCdcFtiAll } from "@/services/profilCdcFti";

const titleTentangKamiItems = [
  {
    label: "Profil Pusat Karir FTI",
    text: "Website Pusat Karir Fakultas Teknologi Informasi Universitas Sebelas April adalah platform yang menyediakan informasi terkait peluang karir bagi mahasiswa dan lulusan di bidang teknologi informasi. Website ini dirancang untuk membantu mahasiswa dalam mempersiapkan diri menghadapi dunia kerja melalui berbagai fitur, seperti informasi lowongan kerja, magang, seminar, serta pelatihan pengembangan keterampilan. Selain itu, website ini juga menawarkan bimbingan karir dan tips dalam menyusun CV, surat lamaran, serta panduan menghadapi wawancara. Tujuannya adalah mendukung para lulusan dalam mengembangkan karir dan memperluas jaringan profesional di industri teknologi informasi.",
  },
];

export default function ProfilCDCFTI() {
  const [data, setData] = useState<ProfilCdcFtiItem | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [apiErrorData, setApiErrorData] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const response = await getProfilCdcFtiAll();
      if (response.success && response.data && response.data.length > 0) {
        setData(response.data[0]);
        setApiErrorData(null);
      } else {
        setApiErrorData(response.error || "Data tidak ditemukan.");
      }
      setIsLoadingData(false);
    };

    fetchAll();
  }, []);

  if (isLoadingData) {
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
  }

  if (!data) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
        <p className="text-sm text-danger-primary">{apiErrorData || "Data tidak ditemukan."}</p>
      </div>
    );
  }

  return (
    <main>
      {/* Title Tentang */}
      <HeroTentangKami titleTentangKamiItems={titleTentangKamiItems} />

      {/* Section Tentang */}
      <div className="xs:w-11/12 lg:w-10/12 mx-auto flex flex-col gap-8 py-8">
        <div className="grid xs:grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="group flex flex-col gap-2 text-3xl font-bold">
            <span className="xs:text-xl sm:text-4xl">Tempat terbaik Untuk</span>
            <div className="flex gap-2">
              <div className="relative z-10 w-fit">
                <span className="relative z-10 xs:text-xl sm:text-4xl text-primary-primary font-bold">Berkembang</span>
                <div className="absolute top-1/2 w-3/5 h-1/2 bg-secondary-primary"></div>
              </div>
              &amp;
              <div className="relative z-10 w-fit">
                <span className="relative xs:text-xl sm:text-4xl z-10 text-primary-primary font-bold">Tumbuh</span>
                <div className="absolute top-1/2 right-0 w-3/5 h-1/2 bg-secondary-primary"></div>
              </div>
            </div>
          </div>
          <RichTextDisplay html={data.profil_cdc_fti_firstname} />
        </div>

        <div className="flex flex-col gap-4 items-center">
          <Image
            src={data.profil_cdc_fti_img}
            alt="Profil CDC FTI"
            width={1280}
            height={720}
            loading="lazy"
            classNames={{
              img: "!max-w-full !h-full aspect-video object-contain object-center rounded-md",
              wrapper: "!max-w-full flex justify-center rounded-md bg-background-primary",
            }}
          />
          <RichTextDisplay html={data.profil_cdc_fti_lastname} />
        </div>
      </div>

      {/* Section Visi */}
      <section className="xs:w-11/12 lg:w-10/12 mx-auto flex flex-col gap-8 py-8">
        <div className="flex flex-col gap-4 items-start">
          <div className="relative z-10 w-fit">
            <span className="relative z-10 xs:text-xl sm:text-4xl text-primary-primary font-bold">Visi</span>
            <div className="absolute top-1/2 w-3/5 h-1/2 bg-secondary-primary"></div>
          </div>
          <div className="grid xs:grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <Image
              src={data.profil_cdc_fti_vision_img}
              alt="Visi"
              width={1280}
              height={720}
              loading="lazy"
              classNames={{
                img: "!max-w-full !h-full aspect-video object-contain object-center rounded-md",
                wrapper: "!max-w-full flex justify-center rounded-md bg-background-primary",
              }}
            />
            <RichTextDisplay html={data.profil_cdc_fti_vision_name} />
          </div>
        </div>
      </section>

      {/* Section Misi */}
      <section className="xs:w-11/12 lg:w-10/12 mx-auto flex flex-col gap-8 py-8">
        <div className="flex flex-col gap-4 items-end">
          <div className="relative z-10 w-fit">
            <p className="relative z-10 xs:text-xl sm:text-4xl text-primary-primary font-bold text-end">Misi</p>
            <div className="absolute top-1/2 right-0 w-3/5 h-1/2 bg-secondary-primary"></div>
          </div>
          <div className="grid xs:grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <RichTextDisplay html={data.profil_cdc_fti_mission_name} />
            <Image
              src={data.profil_cdc_fti_mission_img}
              alt="Misi"
              width={1280}
              height={720}
              loading="lazy"
              classNames={{
                img: "!max-w-full !h-full aspect-video object-contain object-center rounded-md",
                wrapper: "!max-w-full flex justify-center rounded-md bg-background-primary",
              }}
            />
          </div>
        </div>
      </section>

      {/* Section Tujuan */}
      <section className="xs:w-11/12 lg:w-10/12 mx-auto flex flex-col gap-8 py-8">
        <div className="flex flex-col gap-4 items-start">
          <div className="relative z-10 w-fit">
            <p className="relative z-10 xs:text-xl sm:text-4xl text-primary-primary font-bold">Tujuan</p>
            <div className="absolute top-1/2 w-3/5 h-1/2 bg-secondary-primary"></div>
          </div>
          <div className="grid xs:grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <Image
              src={data.profil_cdc_fti_benefit_img}
              alt="Tujuan"
              width={1280}
              height={720}
              loading="lazy"
              classNames={{
                img: "!max-w-full !h-full aspect-video object-contain object-center rounded-md",
                wrapper: "!max-w-full flex justify-center rounded-md bg-background-primary",
              }}
            />
            <RichTextDisplay html={data.profil_cdc_fti_goal_name} />
          </div>
        </div>
      </section>

      {/* Section Manfaat */}
      <section className="xs:w-11/12 lg:w-10/12 mx-auto flex flex-col gap-8 py-8">
        <div className="flex flex-col gap-4 items-end">
          <div className="relative z-10 w-fit">
            <p className="relative z-10 xs:text-xl sm:text-4xl text-primary-primary font-bold text-end">Manfaat</p>
            <div className="absolute top-1/2 right-0 w-3/5 h-1/2 bg-secondary-primary"></div>
          </div>
          <div className="grid xs:grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <RichTextDisplay html={data.profil_cdc_fti_benefit_name} />
            <Image
              src={data.profil_cdc_fti_benefit_img}
              alt="Manfaat"
              width={1280}
              height={720}
              loading="lazy"
              classNames={{
                img: "!max-w-full !h-full aspect-video object-contain object-center rounded-md",
                wrapper: "!max-w-full flex justify-center rounded-md bg-background-primary",
              }}
            />
          </div>
        </div>
      </section>

      {/* Section Partnership */}
      <PartnershipSection />
    </main>
  );
}
