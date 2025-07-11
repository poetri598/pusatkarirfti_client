"use client";
import React from "react";

// Iconsax
import { SearchNormal1 } from "iconsax-react";

// Components
import { Input, Image } from "@heroui/react";
interface Props {
  keyword: string;
  setKeyword: (value: string) => void;
}

export default function SectionHeroUser({ keyword, setKeyword }: Props) {
  return (
    <section className="relative h-screen bg-hero-gradient content-center overflow-hidden">
      {/* Vectors & Images */}
      <Image src="/hero-left-vector.png" alt="left vector" width={1440} height={1440} loading="lazy" classNames={{ img: "absolute top-0 -left-12 xs:w-48  !h-fit ", wrapper: "absolute top-0 -left-12 xs:w-48  !h-fit " }} />
      <Image
        src="/hero-right-vector.png"
        alt="right vector"
        width={1440}
        height={1440}
        loading="lazy"
        classNames={{ img: "absolute top-0 right-0 xs:w-full lg:!w-1/2 xs:h-full lg:!h-full ", wrapper: "absolute top-0 right-0 xs:w-full lg:!w-1/2 xs:h-full lg:!h-full " }}
      />
      <Image
        src="/hero-women.png"
        alt="hero woman"
        width={1440}
        height={1440}
        loading="lazy"
        classNames={{ img: "absolute bottom-0 left-0 xs:w-40 sm:w-64 lg:w-72 !h-fit ", wrapper: "absolute bottom-0 left-0 xs:w-40 sm:w-64 lg:w-72 !h-fit " }}
      />
      <Image
        src="/hero-men.png"
        alt="hero man"
        width={1440}
        height={1440}
        loading="lazy"
        classNames={{ img: "absolute bottom-0 right-0 xs:w-32 sm:w-48 lg:w-72 !h-fit ", wrapper: "absolute bottom-0 right-0 xs:w-32 sm:w-48 lg:w-72 !h-fit " }}
      />

      {/* Hero Content */}
      <div className="z-10 xs:w-11/12 lg:w-6/12 mx-auto flex flex-col gap-4 text-center">
        <p className="xs:text-lg md:text-4xl font-bold text-background-primary">Temukan Potensi Dirimu bersama kami di Pusat Karir FTI UNSAP!</p>
        <p className="text-sm text-background-primary">Ingin lebih produktif? atau nambah skill dan cari pengalaman baru? Ayoo, Ambil Kesempatan untuk pelatihan, magang & lowongan kerja bersama kami.</p>

        {/* Search */}
        <Input
          value={keyword}
          onValueChange={setKeyword}
          endContent={<SearchNormal1 size={32} color="currentColor" className="text-primary-primary transition-colors hover:text-background-primary hover:bg-primary-primary rounded-lg p-2" />}
          placeholder="Masukkan kata kunci..."
          type="text"
          classNames={{
            input: "placeholder:text-text-secondary placeholder:text-sm focus:!text-text-secondary focus:!border-primary-primary",
            inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary bg-background-primary xs:w-full md:w-1/2 mx-auto",
          }}
        />
        <p className="text-sm text-background-primary">Apa yang saat ini ingin kamu pelajari coba cari!</p>
      </div>
    </section>
  );
}
