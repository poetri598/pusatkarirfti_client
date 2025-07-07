"use client";
import React from "react";

// Components
import { Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Image } from "@heroui/react";

const signup = [
  { label: "Mahasiswa", href: "/register-mahasiswa" },
  { label: "Alumni", href: "/register-alumni" },
  { label: "Perusahaan", href: "/register-perusahaan" },
];

export default function SectionDaftarUser() {
  return (
    <>
      <>
        <section className="w-full relative bg-primary-surface overflow-hidden ">
          <div className="xs:w-11/12 lg:w-10/12 z-10  mx-auto flex flex-col justify-center items-center gap-4 py-32 ">
            <span className=" text-sm text-text-secondary">Ayooo daftar sekarang !</span>
            <span className=" xs:text-base md:text-4xl text-center font-bold text-primary-primary">Dapatkan Informasi Pengembangan Karir Untukmu. </span>
            <Dropdown classNames={{ base: "bg-transparent gap-4", content: "bg-transparent shadow-none" }}>
              <DropdownTrigger>
                <Button disableRipple className=" bg-secondary-primary text-primary-primary data-[hover=true]:bg-background-primary data-[hover=true]:text-primary-primary group" radius="md" variant="light">
                  Daftar Sekarang
                </Button>
              </DropdownTrigger>

              <DropdownMenu classNames={{ list: "gap-2" }}>
                {signup.map((item, index) => (
                  <DropdownItem key={index} href={item.href} className="signup data-[hover=true]:bg-background-primary data-[hover=true]:text-primary-primary hover:bg-kground-primary">
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <Image
            src="/vector-section-daftar-left.png"
            alt="right vector"
            width={1440}
            height={1440}
            loading="lazy"
            classNames={{ img: "absolute top-0 sm:left-16  rotate-180  xs:w-40 sm:w-1/2 !h-fit ", wrapper: "absolute top-0 sm:left-16  xs:w-40 sm:w-1/2 !h-fit  " }}
          />
          <Image
            src="/vector-section-daftar-left.png"
            alt="hero woman"
            width={1440}
            height={1440}
            loading="lazy"
            classNames={{ img: "absolute bottom-0 sm:left-32  rotate-0  xs:w-40 sm:w-1/2 !h-fit ", wrapper: "absolute bottom-0 sm:left-32 xs:w-40 sm:w-1/2 !h-fit  " }}
          />
          <Image
            src="/vector-section-daftar-right.png"
            alt="hero man"
            width={1440}
            height={1440}
            loading="lazy"
            classNames={{ img: "absolute bottom-0 right-0  rotate-0 xs:w-28 sm:w-1/2 !h-fit ", wrapper: "absolute bottom-0 right-0 xs:w-28 sm:w-1/2 !h-fit  " }}
          />
        </section>
      </>
    </>
  );
}
