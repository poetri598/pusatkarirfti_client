"use client";
import React from "react";

// Components
import SectionTitleKonseling from "@/components/User/Konseling/SectionTitleKonseling";
import SectionDaftarKonseling from "@/components/User/Konseling/SectionDaftarKonseling";

export default function PageKonseling() {
  return (
    <>
      <>
        <main>
          {/* Section Title Konseling */}
          <SectionTitleKonseling />

          {/* Section Daftar Konseling */}
          <SectionDaftarKonseling />
        </main>
      </>
    </>
  );
}
