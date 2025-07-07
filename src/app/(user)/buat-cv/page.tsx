"use client";
import React from "react";

// Iconsax
import { User, Sms, Discover, DocumentDownload, AddCircle, ArrowRight2 } from "iconsax-react";

// Components
import { Form, Breadcrumbs, BreadcrumbItem, Avatar, Link, Button, Accordion, AccordionItem, ScrollShadow, Input, Textarea } from "@heroui/react";

// Dummy
export const program_studies = [
  { key: "sistem_informasi", label: "Sistem Informasi" },
  { key: "informatika", label: "Informatika" },
];

export const genders = [
  { key: "laki_laki", label: "Laki Laki" },
  { key: "perempuan", label: "Perempuan" },
];

export default function BuatCV() {
  return (
    <>
      <>
        <section className="w-full bg-background-primary py-8">
          <div className="w-10/12 mx-auto flex flex-col gap-8">
            {/* Breadcrumb */}
            <Breadcrumbs
              className="text-sm text-text-secondary"
              itemClasses={{
                item: "data-[current=true]:text-primary-primary",
              }}
            >
              <BreadcrumbItem href="/">Beranda</BreadcrumbItem>
              <BreadcrumbItem href="/cdc-news/1" className="text-primary-primary">
                Buat CV
              </BreadcrumbItem>
            </Breadcrumbs>

            <div className="flex flex-row items-center p-8 gap-8 justify-between rounded-medium">
              <div className="flex items-center gap-8">
                <Avatar className="w-20 h-20" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                <div className="flex flex-col gap-4">
                  <p className="text-base">Agus Einstein</p>
                  <div className="flex items-center gap-2">
                    <User size={16} variant="Linear" color="currentColor" className="text-primary-primary" />
                    <p className="text-text-secondary">-</p>
                    <Sms size={16} variant="Bold" color="currentColor" className="text-primary-primary" />
                    <p className="text-sm text-text-secondary">a2.27800071@mhs.stmik-sumedang.ac.id</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button endContent={<Discover size={16} variant="Bulk" color="currentColor" className="text-background-primary" />} as={Link} color="default" href="https://github.com/heroui-inc/heroui" variant="solid" className="login">
                  Preview
                </Button>
                <Button
                  endContent={<DocumentDownload size={16} variant="Bulk" color="currentColor" className="text-background-primary" />}
                  as={Link}
                  color="default"
                  href="https://github.com/heroui-inc/heroui"
                  variant="solid"
                  className="login"
                >
                  Download
                </Button>
              </div>
            </div>

            <Accordion variant="splitted" className="gap-8" isCompact>
              <AccordionItem
                key="data_diri"
                textValue="Data Diri"
                title={
                  <div className="relative w-fit">
                    <p className=" relative z-10 text-xl text-primary-primary font-bold ">Data Diri</p>
                    <div className="absolute top-1/2 w-5/6 h-1/2 bg-secondary-primary"></div>
                  </div>
                }
                classNames={{ indicator: "py-4" }}
              >
                <ScrollShadow className="w-full h-96 py-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="flex flex-col gap-4">
                      {/* Nama  */}
                      <Input
                        isRequired
                        label="Nama Lengkap"
                        labelPlacement="outside"
                        type="text"
                        defaultValue={"Agus Einstein"}
                        variant="bordered"
                        classNames={{
                          input: "placeholder:text-text-secondary !text-text-secondary focus:!border-primary-primary",
                          inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                        }}
                      />

                      {/* Alamat  */}
                      <Input
                        isRequired
                        label="Alamat"
                        labelPlacement="outside"
                        type="text"
                        defaultValue={"Sumedang"}
                        variant="bordered"
                        classNames={{
                          input: "placeholder:text-text-secondary !text-text-secondary focus:!border-primary-primary",
                          inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                        }}
                      />
                      {/* Nomor HP */}
                      <Input
                        isRequired
                        label="Nomor HP"
                        labelPlacement="outside"
                        type="text"
                        defaultValue={"08123456789"}
                        variant="bordered"
                        classNames={{
                          input: "placeholder:text-text-secondary !text-text-secondary focus:!border-primary-primary",
                          inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      {/* Nama  */}
                      <Input
                        isRequired
                        label="Nama Lengkap"
                        labelPlacement="outside"
                        type="text"
                        defaultValue={"Agus Einstein"}
                        variant="bordered"
                        classNames={{
                          input: "placeholder:text-text-secondary !text-text-secondary focus:!border-primary-primary",
                          inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                        }}
                      />

                      {/* Alamat  */}
                      <Input
                        isRequired
                        label="Alamat"
                        labelPlacement="outside"
                        type="text"
                        defaultValue={"Sumedang"}
                        variant="bordered"
                        classNames={{
                          input: "placeholder:text-text-secondary !text-text-secondary focus:!border-primary-primary",
                          inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                        }}
                      />
                      {/* Nomor HP */}
                      <Input
                        isRequired
                        label="Nomor HP"
                        labelPlacement="outside"
                        type="text"
                        defaultValue={"08123456789"}
                        variant="bordered"
                        classNames={{
                          input: "placeholder:text-text-secondary !text-text-secondary focus:!border-primary-primary",
                          inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                        }}
                      />
                    </div>

                    {/* Deskripsi Diri  */}
                    <Input
                      isRequired
                      label="Deskripsikan tentang diri anda"
                      labelPlacement="outside"
                      type="text"
                      defaultValue={
                        "Seorang profesional di bidang pemrograman dengan pengalaman 1+ tahun. Memiliki keahlian dalam mengembangkan aplikasi berbasis web, menulis kode yang efisien dan terstruktur, serta mengoptimalkan kinerja sistem. Berorientasi pada hasil dengan kemampuan analisis yang kuat serta terbiasa bekerja dalam waktu lintas fungsi. Saat ini mencari peluang untuk mengembangkan keterampilan lebih lanjut dalam peran pengembangan perangkat lunak di industri teknologi."
                      }
                      variant="bordered"
                      classNames={{
                        base: "w-full",
                        input: "placeholder:text-text-secondary !text-text-secondary focus:!border-primary-primary",
                        inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                      }}
                    />
                  </div>
                </ScrollShadow>
              </AccordionItem>
            </Accordion>
            <div className="w-full flex justify-end p-8 ">
              <Button type="submit" className="login">
                Simpan
              </Button>
            </div>
          </div>
        </section>
      </>
    </>
  );
}
