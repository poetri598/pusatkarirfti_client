"use client";
import { useState } from "react";

// Components
import SectionHero from "./SectionHeroUser";
import SectionHasilPencarianUser from "./SectionHasilPencarian";
import SectionLowonganPekerjaan from "./SectionLowonganPekerjaanUser";
import SectionMagang from "./SectionMagangUser";
import SectionCarousel from "./SectionCarouselUser";
import SectionPelatihan from "./SectionPelatihanUser";
import SectionHero2 from "./SectionHero2";
import SectionBerita from "./SectionBeritaUser";
import SectionRuangMahasiswa from "./SectionRuangMahasiswaUser";
import SectionPartnership from "./SectionPartnershipUser";
import SectionDaftar from "./SectionDaftarUser";

export default function PageBerandaUser() {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <>
      <main>
        {/* Section Hero */}
        <SectionHero searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />
        <SectionHasilPencarianUser searchKeyword={searchKeyword} />

        {/* Section Job */}
        <SectionLowonganPekerjaan />

        {/* Section Internship */}
        <SectionMagang />

        {/* Section Carousel */}
        <SectionCarousel />

        {/* Section Training */}
        <SectionPelatihan />

        {/* Section Hero2 */}
        <SectionHero2 />

        {/* Section CDCNews */}
        <SectionBerita />

        {/* Section StudentsRoom */}
        <SectionRuangMahasiswa />

        {/* Section Partnership */}
        <SectionPartnership />

        {/* Section Signup */}
        <SectionDaftar />
      </main>
    </>
  );
}
