"use client";
import React, { useState, useEffect } from "react";

// Iconsax
import { Sms, Instagram, Facebook, Youtube, Whatsapp } from "iconsax-react";

// NextJS
import { Spinner, Image } from "@heroui/react";
import Link from "next/link";

// Components
import Logo from "@/components/HeaderFooter/Logo";

// Types
import { ProfilCdcFtiItem } from "@/types/profilCdcFti";

// Services
import { getProfilCdcFtiAll } from "@/services/profilCdcFti";

type Props = {
  className?: string;
};

export default function Footer(props: Props) {
  const { className } = props;
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
    <>
      <section className={className}>
        <div className="xs:w-11/12 lg:w-10/12 min-h-screen  mx-auto flex flex-col justify-center items-center xs:gap-8 md:gap-8 py-8 ">
          <div className="flex flex-col xs:gap-2 xl:gap-6">
            <Logo />
            <span className="text-base text-text-primary">Hubungi Kami</span>
            <Link href="https://maps.app.goo.gl/rdXWk9GQLRf18dhf8" target="_blank" rel="noopener noreferrer" className="flex flex-col group cursor-pointer transition-all hover:opacity-90">
              <p className="text-xs text-text-primary font-semibold group-hover:text-primary-border transition-all">Alamat : Jl. Angkrek Situ No.19, Situ, Kec. Sumedang Utara, Kabupaten Sumedang, Jawa Barat 45621</p>
              <p className="text-xs text-text-primary font-semibold group-hover:text-primary-border transition-all">Fakultas Teknologi Informasi</p>
              <p className="text-xs text-text-primary font-semibold group-hover:text-primary-border transition-all">Universitas Sebelas April</p>
            </Link>

            <Link href={`https://mail.google.com/mail/?view=cm&fs=1&to=${data.profil_cdc_fti_email}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 group transition-all hover:opacity-90">
              <Sms size={16} color="currentColor" variant="Bold" className="text-primary-primary group-hover:text-primary-border transition-all" />
              <p className="text-xs font-semibold text-text-primary group-hover:text-primary-border transition-all">{data.profil_cdc_fti_email}</p>
            </Link>

            <div className="flex gap-3">
              <Link href={data.profil_cdc_fti_instagram} className="px-2 py-2 bg-primary-primary rounded-lg hover:bg-primary-hover ">
                <Instagram size={16} color="currentColor" variant="Bold" className="text-background-primary " />
              </Link>
              <Link href={data.profil_cdc_fti_facebook} className="px-2 py-2 bg-primary-primary rounded-lg hover:bg-primary-hover ">
                <Facebook size={16} color="currentColor" variant="Bold" className="text-background-primary " />
              </Link>
              <Link href={data.profil_cdc_fti_youtube} className="px-2 py-2 bg-primary-primary rounded-lg hover:bg-primary-hover ">
                <Youtube size={16} color="currentColor" variant="Bold" className="text-background-primary " />
              </Link>
              <Link href={data.profil_cdc_fti_whatsapp} className="px-2 py-2 bg-primary-primary rounded-lg hover:bg-primary-hover ">
                <Whatsapp size={16} color="currentColor" variant="Bold" className="text-background-primary " />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
