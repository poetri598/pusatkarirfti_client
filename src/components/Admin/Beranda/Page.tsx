"use client";

import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import SectionLowonganPekerjaan from "@/components/Admin/Beranda/SectionLowonganPekerjaan";
import SectionMagang from "@/components/Admin/Beranda/SectionMagang";
import SectionPelatihan from "@/components/Admin/Beranda/SectionPelatihan";
import SectionBerita from "@/components/Admin/Beranda/SectionBerita";
import SectionKonseling from "@/components/Admin/Beranda/SectionKonseling";
import SectionExpo from "@/components/Admin/Beranda/SectionExpo";
import SectionPengguna from "@/components/Admin/Beranda/SectionPengguna";

export default function Page() {
  return (
    <main className="w-full mx-auto flex flex-col gap-4 xs:p-0 md:p-8 bg-background-primary overflow-hidden">
      {/* Breadcrumb */}
      <Breadcrumbs
        itemClasses={{
          item: "data-[current=true]:text-primary-primary text-xs text-text-secondary",
        }}
      >
        <BreadcrumbItem href="/beranda">Beranda</BreadcrumbItem>
      </Breadcrumbs>

      {/* Section Pengguna */}
      <SectionPengguna />

      <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
        {/* Section Konseling */}
        <SectionKonseling />

        {/* Section Lowongan Pekerjaan */}
        <SectionLowonganPekerjaan />

        {/* Section Magang */}
        <SectionMagang />

        {/* Section Pelatihan */}
        <SectionPelatihan />

        {/* Section Expo */}
        <SectionExpo />

        {/* Section Berita */}
        <SectionBerita />
      </div>
    </main>
  );
}
