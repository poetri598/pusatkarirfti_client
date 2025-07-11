"use client";
import React, { useState, useEffect } from "react";

// Iconsax
import { Sms, Instagram, Facebook, Youtube, Whatsapp } from "iconsax-react";

// NextJS
import { Spinner, Image } from "@heroui/react";
import Link from "next/link";

// Components
import Logo from "./Logo";

// Types
import { ProfilCdcFtiItem } from "@/types/profilCdcFti";

// Services
import { getProfilCdcFtiAll } from "@/services/profilCdcFti";

export default function Footer() {
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
    <footer className="w-full mx-auto flex flex-col gradient-style overflow-hidden">
      {/* Footer Desktop */}
      <div className="xs:hidden md:flex flex-col text-background-primary text-xs gap-6 py-32 xs:w-11/12 lg:w-10/12 mx-auto">
        <div className="grid grid-cols-2 xs:gap-2 xl:gap-8">
          {/* Kotak Kiri */}
          <div className="h-full flex flex-col xs:gap-2 xl:gap-6">
            <Logo />

            {/* Gmaps Link */}
            <Link href="https://maps.app.goo.gl/rdXWk9GQLRf18dhf8" target="_blank" rel="noopener noreferrer" className="group flex flex-col cursor-pointer transition-all hover:opacity-90">
              <p className="text-xs text-background-primary group-hover:text-primary-border transition-all">Alamat: Jl. Angkrek Situ No.19, Situ, Kec. Sumedang Utara, Kabupaten Sumedang, Jawa Barat 45621</p>
              <p className="text-xs text-background-primary group-hover:text-primary-border transition-all">Fakultas Teknologi Informasi</p>
              <p className="text-xs text-background-primary group-hover:text-primary-border transition-all">Universitas Sebelas April</p>
            </Link>

            {/* Gmail Link */}
            <Link href={`https://mail.google.com/mail/?view=cm&fs=1&to=${data.profil_cdc_fti_email}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-1 transition-all hover:opacity-90">
              <Sms size={16} color="currentColor" variant="Bold" className="text-background-primary transition-all group-hover:text-primary-border" />
              <p className="text-xs text-background-primary transition-all group-hover:text-primary-border">{data.profil_cdc_fti_email}</p>
            </Link>

            <Image src="/kampusmerdeka.png" alt="Kampus Merdeka" width={150} height={80} />
          </div>

          {/* Kotak Kanan */}
          <div className="h-full flex justify-end xs:gap-4 xl:gap-8">
            <div className="flex flex-col justify-start xs:gap-2 xl:gap-6 font-bold">
              <Link href="/" className="hover:text-primary-border">
                Beranda
              </Link>
              <Link href="/berita" className="hover:text-primary-border">
                Berita
              </Link>
              <Link href="/tracer-study" className="hover:text-primary-border">
                Tracer Study
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <Link href="/lowongan-pekerjaan" className="hover:text-primary-border font-bold">
                Karir
              </Link>
              <span className="flex flex-col gap-3">
                <Link href="/lowongan-pekerjaan" className="hover:text-primary-border">
                  Lowongan Kerja
                </Link>
                <Link href="/magang" className="hover:text-primary-border">
                  Magang
                </Link>
                <Link href="/pelatihan" className="hover:text-primary-border">
                  Pelatihan
                </Link>
                <Link href="/expo" className="hover:text-primary-border">
                  Expo
                </Link>
                <Link href="/konseling" className="hover:text-primary-border">
                  Konseling
                </Link>
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <Link href="/profil-cdc-fti" className="hover:text-primary-border font-bold">
                Tentang Kami
              </Link>
              <span className="flex flex-col gap-3">
                <Link href="/profil-cdc-fti" className="hover:text-primary-border">
                  Profil CDC FTI
                </Link>
                <Link href="/kegiatan-cdc-fti" className="hover:text-primary-border">
                  Kegiatan CDC FTI
                </Link>
                <Link href="/hubungi-kami" className="hover:text-primary-border">
                  Hubungi Kami
                </Link>
              </span>
            </div>
          </div>
        </div>

        {/* Garis */}
        <div className="border-t-2 border-solid border-white"></div>

        {/* Bawah Garis */}
        <div className="flex justify-between items-center">
          <p>@2025. Fakultas Teknologi Informasi - Universitas Sebelas April.</p>
          <div className="flex gap-3">
            <Link href={data.profil_cdc_fti_instagram} className="px-2 py-2 bg-primary-primary rounded-lg hover:bg-primary-hover">
              <Instagram size={16} color="currentColor" variant="Bold" className="text-background-primary" />
            </Link>
            <Link href={data.profil_cdc_fti_facebook} className="px-2 py-2 bg-primary-primary rounded-lg hover:bg-primary-hover">
              <Facebook size={16} color="currentColor" variant="Bold" className="text-background-primary" />
            </Link>
            <Link href={data.profil_cdc_fti_youtube} className="px-2 py-2 bg-primary-primary rounded-lg hover:bg-primary-hover">
              <Youtube size={16} color="currentColor" variant="Bold" className="text-background-primary" />
            </Link>
            <Link href={data.profil_cdc_fti_whatsapp} className="px-2 py-2 bg-primary-primary rounded-lg hover:bg-primary-hover">
              <Whatsapp size={16} color="currentColor" variant="Bold" className="text-background-primary" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Mobile */}
      <div className="xs:flex md:hidden justify-center items-center py-4">
        <span className="text-xs text-center text-background-primary">@2025. Fakultas Teknologi Informasi - Universitas Sebelas April</span>
      </div>
    </footer>
  );
}
