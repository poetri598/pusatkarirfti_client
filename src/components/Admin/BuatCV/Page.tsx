"use client";

import React from "react";

// Iconsax
import { User, Sms, Discover } from "iconsax-react";

// Components
import { Breadcrumbs, BreadcrumbItem, Avatar, Button, Accordion, AccordionItem, ScrollShadow } from "@heroui/react";
import SectionDataDiri from "@/components/Admin/BuatCV/SectionDataDiri";
import SectionPengalamanKerja from "@/components/Admin/BuatCV/SectionPengalamanKerja";
import SectionPengalamanOrganisasi from "@/components/Admin/BuatCV/SectionPengalamanOrganisasi";
import SectionRiwayatPendidikan from "@/components/Admin/BuatCV/SectionRiwayatPendidikan";
import SectionPenghargaan from "@/components/Admin/BuatCV/SectionPenghargaan";
import SectionKeahlian from "@/components/Admin/BuatCV/SectionKeahlian";

// Context
import { useAuth } from "@/context/AuthContext";

export default function Page() {
  const { user } = useAuth();

  return (
    <>
      <>
        <section className="w-full bg-background-primary py-8">
          <div className="w-full mx-auto flex flex-col gap-4 xs:p-0 md:p-8 bg-background-primary overflow-hidden">
            {/* Breadcrumb */}
            <Breadcrumbs
              className="text-xs text-text-secondary"
              itemClasses={{
                item: "data-[current=true]:text-primary-primary",
              }}
            >
              <BreadcrumbItem href="/">Beranda</BreadcrumbItem>
              <BreadcrumbItem href="/buat-cv" className="text-primary-primary">
                Buat CV
              </BreadcrumbItem>
            </Breadcrumbs>

            <div className="flex xs:flex-col md:flex-row xs:justify-start xs:items-start md:items-center md:justify-between xs:p-0 md:p-8 xs:gap-4 md:gap-8  rounded-medium">
              <div className="flex items-center gap-2">
                <Avatar className="w-20 h-20" src={user?.user_img} />
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-text-secondary">{user?.user_fullname}</p>
                  <div className="flex items-center gap-2">
                    <User size={16} variant="Linear" color="currentColor" className="text-primary-primary" />
                    <p className="text-text-secondary">-</p>
                    <Sms size={16} variant="Bold" color="currentColor" className="text-primary-primary" />
                    <p className="text-xs text-text-secondary">{user?.user_email}</p>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-end">
                <Button
                  endContent={<Discover size={16} variant="Bulk" color="currentColor" className="text-background-primary" />}
                  color="default"
                  variant="solid"
                  className="login"
                  onPress={() => {
                    window.location.href = `/cv-preview/${user?.user_name}`;
                  }}
                >
                  Preview
                </Button>
              </div>
            </div>

            <Accordion variant="splitted" className="gap-8 min-h-screen" isCompact>
              {/* Data Diri */}
              <AccordionItem
                key="data_diri"
                textValue="Data Diri"
                title={
                  <div className="relative w-fit">
                    <p className=" relative z-10 xs:text-base md:text-xl text-primary-primary font-bold ">Data Diri</p>
                    <div className="absolute top-1/2 w-5/6 h-1/2 bg-secondary-primary"></div>
                  </div>
                }
                classNames={{ indicator: "py-4" }}
              >
                <ScrollShadow className="w-full h-96 xs:py-8 md:p-8" hideScrollBar>
                  <SectionDataDiri />
                </ScrollShadow>
              </AccordionItem>

              {/* Pengalaman Kerja */}
              <AccordionItem
                key="pengalaman_kerja"
                textValue="Pengalaman Kerja"
                title={
                  <div className="relative w-fit">
                    <p className=" relative z-10 xs:text-base md:text-xl text-primary-primary font-bold ">Pengalaman Kerja</p>
                    <div className="absolute top-1/2 w-5/6 h-1/2 bg-secondary-primary"></div>
                  </div>
                }
                classNames={{ indicator: "py-4" }}
              >
                <ScrollShadow className="w-full h-96 xs:py-8 md:p-8" hideScrollBar>
                  <SectionPengalamanKerja />
                </ScrollShadow>
              </AccordionItem>

              {/* Pengalaman Organisasi */}
              <AccordionItem
                key="pengalaman_organisasi"
                textValue="Pengalaman Organisasi"
                title={
                  <div className="relative w-fit">
                    <p className=" relative z-10 xs:text-base md:text-xl text-primary-primary font-bold ">Pengalaman Organisasi</p>
                    <div className="absolute top-1/2 w-5/6 h-1/2 bg-secondary-primary"></div>
                  </div>
                }
                classNames={{ indicator: "py-4" }}
              >
                <ScrollShadow className="w-full h-96 xs:py-8 md:p-8" hideScrollBar>
                  <SectionPengalamanOrganisasi />
                </ScrollShadow>
              </AccordionItem>

              {/* Riwayat Pendidikan */}
              <AccordionItem
                key="riwayat_pendidikan"
                textValue="Riwayat Pendidikan"
                title={
                  <div className="relative w-fit">
                    <p className=" relative z-10 xs:text-base md:text-xl text-primary-primary font-bold ">Riwayat Pendidikan</p>
                    <div className="absolute top-1/2 w-5/6 h-1/2 bg-secondary-primary"></div>
                  </div>
                }
                classNames={{ indicator: "py-4" }}
              >
                <ScrollShadow className="w-full h-96 xs:py-8 md:p-8" hideScrollBar>
                  <SectionRiwayatPendidikan />
                </ScrollShadow>
              </AccordionItem>

              {/* Penghargaan */}
              <AccordionItem
                key="penghargaan"
                textValue="Penghargaan"
                title={
                  <div className="relative w-fit">
                    <p className=" relative z-10 xs:text-base md:text-xl text-primary-primary font-bold ">Penghargaan</p>
                    <div className="absolute top-1/2 w-5/6 h-1/2 bg-secondary-primary"></div>
                  </div>
                }
                classNames={{ indicator: "py-4" }}
              >
                <ScrollShadow className="w-full h-96 xs:py-8 md:p-8" hideScrollBar>
                  <SectionPenghargaan />
                </ScrollShadow>
              </AccordionItem>

              {/* Keahlian */}
              <AccordionItem
                key="keahlian"
                textValue="Keahlian"
                title={
                  <div className="relative w-fit">
                    <p className=" relative z-10 xs:text-base md:text-xl text-primary-primary font-bold ">Keahlian</p>
                    <div className="absolute top-1/2 w-5/6 h-1/2 bg-secondary-primary"></div>
                  </div>
                }
                classNames={{ indicator: "py-4" }}
              >
                <ScrollShadow className="w-full h-96 xs:py-8 md:p-8" hideScrollBar>
                  <SectionKeahlian />
                </ScrollShadow>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </>
    </>
  );
}
