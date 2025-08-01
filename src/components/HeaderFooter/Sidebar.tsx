"use client";
import React, { useState, useMemo } from "react";

// NextJS
import { usePathname } from "next/navigation";
import Image from "next/image";

// Iconsax
import { Teacher, Courthouse, ClipboardText, Graph, Logout, People, SidebarRight, SearchNormal1, Setting, House2, Briefcase, More2 } from "iconsax-react";

// Components
import { Accordion, AccordionItem, Link, Input, Tooltip } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { showConfirmationLogoutDialog, showSuccessLogoutDialog, showErrorDialog } from "@/components/Custom/AlertButton";

type SidebarProps = { open: boolean; setOpen: (value: boolean) => void };

// Dummy Data
const career = [
  { label: "Lowongan Pekerjaan", href: "/lowongan-pekerjaan" },
  { label: "Magang", href: "/magang" },
  { label: "Pelatihan", href: "/pelatihan" },
  { label: "Expo", href: "/expo" },
  { label: "Konseling", href: "/konseling" },
];

const about_us = [
  { label: "Profil CDC FTI", href: "/profil-cdc-fti" },
  { label: "Kegiatan CDC FTI", href: "/kegiatan-cdc-fti" },
  { label: "Hubungi Kami", href: "/hubungi-kami" },
];

const more = [
  { label: "Umur", href: "/umur" },
  { label: "Kota", href: "/kota" },
  { label: "Tipe Konseling", href: "/tipe-konseling" },
  { label: "Negara", href: "/negara" },
  { label: "Pendidikan", href: "/pendidikan" },
  { label: "Pengalaman", href: "/pengalaman" },
  { label: "Tipe Expo", href: "/tipe-expo" },
  { label: "Jenis Kelamin", href: "/jenis-kelamin" },
  { label: "Tinggi Badan", href: "/tinggi-badan" },
  { label: "Industri", href: "/industri" },
  { label: "Tipe Magang", href: "/tipe-magang" },
  { label: "Ipk", href: "/ipk" },
  { label: "Tipe Pekerjaan", href: "/tipe-pekerjaan" },
  { label: "Status Perkawinan", href: "/status-perkawinan" },
  { label: "Mode", href: "/mode" },
  { label: "Tipe Berita", href: "/tipe-berita" },
  { label: "Platform", href: "/platform" },
  { label: "Posisi", href: "/posisi" },
  { label: "Program Studi", href: "/program-studi" },
  { label: "Provinsi", href: "/provinsi" },
  { label: "Agama", href: "/agama" },
  { label: "Peran Pengguna", href: "/peran-pengguna" },
  { label: "Semester", href: "/semester" },
  { label: "Skill", href: "/skill" },
  { label: "Skill Level", href: "/skill-level" },
  { label: "Status", href: "/status" },
  { label: "Tipe Pelatihan", href: "/tipe-pelatihan" },
  { label: "Berat Badan", href: "/berat-badan" },
];

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");

  const allMenus = useMemo(
    () => [
      { label: "Beranda", href: "/beranda" },
      { label: "Berita", href: "/berita" },
      { label: "Profil CDC FTI", href: "/profil-cdc-fti" },
      { label: "Pengguna", href: "/pengguna" },
      { label: "Ruang Mahasiswa", href: "/ruang-mahasiswa" },
      { label: "Perusahaan", href: "/perusahaan" },
      { label: "Pengaturan", href: "/pengaturan" },
      ...career,
      ...about_us,
      ...more,
    ],
    []
  );

  const filteredMenus = useMemo(() => allMenus.filter((item) => item.label.toLowerCase().includes(searchTerm.toLowerCase())), [searchTerm]);

  const isCareerActive = career.some((item) => pathname.startsWith(item.href));
  const isAboutUsActive = about_us.some((item) => pathname.startsWith(item.href));
  const isMoreActive = more.some((item) => pathname.startsWith(item.href));

  const { logout } = useAuth();

  return (
    <>
      <>
        <nav className={`fixed top-0 left-0 z-[999] bg-background-primary h-full p-4 duration-300 ease-in-out flex flex-col xs:items-start md:justify-between border border-default-200 gap-2 ${open ? "xs:w-48 md:w-72" : "w-20"} `}>
          {/* Toggle Icon */}
          <SidebarRight
            size={32}
            color="currentColor"
            variant="Linear"
            className={`absolute cursor-pointer -right-4 top-40 text-primary-primary p-1 z-[999] border border-default-200 bg-background-primary rounded-md duration-300 hover:bg-default-200 ${open ? "rotate-180" : "rotate-0"}`}
            onClick={() => setOpen(!open)}
          />

          {/* Logo & Search */}
          <div className="flex flex-col gap-8 ">
            {/* Logo */}
            <Link href="/beranda" className={`flex xs:justify-center md:justify-start items-center gap-2 group/logo text-xs hover:text-primary-primary ${!open && "justify-center"}`}>
              <Image src="/logofti.png" alt="Logo Fakultas Teknologi Informasi Universitas Sebelas April" width={40} height={40} className="group-hover/logo:-rotate-12  object-cover" />
              <div className={`font-poppins xs:hidden md:block ${open ? "block" : "md:hidden"}`}>
                <p className="font-bold">PUSAT KARIR</p>
                <p className="font-bold">FAKULTAS TEKNOLOGI INFORMASI</p>
                <p>UNIVERSITAS SEBELAS APRIL</p>
              </div>
            </Link>

            {/* Search */}
            {!open ? (
              <Tooltip content="Cari" placement="right-end" classNames={{ content: "bg-primary-border text-background-primary" }}>
                <div>
                  <Input
                    variant="bordered"
                    endContent={<SearchNormal1 size={16} color="currentColor" variant="TwoTone" className="text-text-secondary cursor-pointer" />}
                    labelPlacement="inside"
                    placeholder="Cari menu..."
                    type="search"
                    classNames={{
                      base: "cursor-pointer ",
                      mainWrapper: "cursor-pointer ",
                      innerWrapper: "flex items-center justify-center cursor-pointer",
                      input: "hidden",
                    }}
                  />
                </div>
              </Tooltip>
            ) : (
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                endContent={<SearchNormal1 size={16} color="currentColor" variant="TwoTone" />}
                labelPlacement="inside"
                placeholder="Cari menu..."
                variant="bordered"
                type="search"
                classNames={{
                  base: "cursor-pointer",
                  mainWrapper: "cursor-pointer",
                  innerWrapper: "flex items-center justify-center cursor-pointer",
                  input: "placeholder:text-text-secondary !text-sm text-text-secondary",
                  inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                }}
              />
            )}
          </div>

          {/* Menu */}
          <div className="flex flex-col gap-2 overflow-scroll scrollbar-hide  h-full w-full ">
            {searchTerm ? (
              // Hasil pencarian
              filteredMenus.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-2 p-3 rounded-md group cursor-pointer text-text-secondary text-sm hover:text-primary-primary hover:bg-default-200 duration-300 ease-in-out ${
                    pathname.startsWith(item.href) ? "bg-primary-primary text-background-primary" : ""
                  }`}
                >
                  <SearchNormal1 size={16} color="currentColor" variant="TwoTone" />
                  <span>{item.label}</span>
                </Link>
              ))
            ) : (
              <>
                {/* Beranda */}
                {!open ? (
                  <Tooltip content="Beranda" placement="right-end" classNames={{ content: "bg-primary-border text-background-primary" }}>
                    <Link
                      className={`flex items-center gap-2 p-3 rounded-md group text-text-secondary xs:text-xs md:text-sm hover:text-primary-primary hover:bg-default-200 duration-300 ease-in-out  ${!open && "justify-center"} ${
                        pathname === "/beranda" ? "bg-primary-primary text-background-primary" : ""
                      }`}
                      type="button"
                    >
                      <Graph size={16} color="currentColor" variant="TwoTone" className="cursor-pointer" />
                      <span className={`${!open && "hidden"}`}>Beranda</span>
                    </Link>
                  </Tooltip>
                ) : (
                  <Link
                    className={`flex items-center gap-2 p-3 rounded-md group cursor-pointer text-text-secondary xs:text-xs md:text-sm hover:text-primary-primary hover:bg-default-200 duration-300 ease-in-out ${
                      pathname === "/beranda" ? "bg-primary-primary text-background-primary" : ""
                    }`}
                    href="/beranda"
                  >
                    <Graph size={16} color="currentColor" variant="TwoTone" />
                    <span>Beranda</span>
                  </Link>
                )}

                {/* Karir */}
                {!open ? (
                  <Tooltip content="Karir" placement="right-end" classNames={{ content: "bg-primary-border text-background-primary" }}>
                    <div>
                      <Accordion className="w-full px-0">
                        <AccordionItem
                          aria-label="Karir"
                          title="Karir"
                          startContent={<Teacher size={16} color="currentColor" variant="TwoTone" />}
                          classNames={{
                            trigger: `flex items-center justify-center gap-2 p-3 hover:bg-default-200 hover:text-primary-primary group/karir rounded-md ${isCareerActive ? "bg-primary-primary" : ""}`,
                            titleWrapper: `${!open && "hidden"}`,
                            title: `xs:text-xs md:text-sm group-hover/karir:text-primary-primary  ${isCareerActive ? "text-background-primary" : "text-text-secondary"}`,
                            startContent: `group-hover/karir:text-primary-primary ${isCareerActive ? "text-background-primary" : "text-text-secondary"}`,
                            indicator: `group-hover/karir:text-primary-primary ${isCareerActive ? "text-background-primary" : "text-text-secondary"} ${!open && "hidden"}`,
                            content: `pl-8 pr-2 ${!open && "hidden"}`,
                          }}
                        >
                          <div className={`flex flex-col gap-2 py-2 `}>
                            {career.map((item, index) => (
                              <Link key={index} href={item.href} className={`xs:text-xs md:text-sm flex justify-between hover:text-primary-primary ${pathname.startsWith(item.href) ? "text-primary-primary" : "text-text-secondary"}`}>
                                <span>{item.label}</span>
                                {pathname === item.href && (
                                  <div className="border border-primary-primary rounded-full p-1">
                                    <div className="h-2 w-2 bg-primary-primary rounded-full"></div>
                                  </div>
                                )}
                              </Link>
                            ))}
                          </div>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </Tooltip>
                ) : (
                  <Accordion className="w-full px-0">
                    <AccordionItem
                      aria-label="Karir"
                      title="Karir"
                      startContent={<Teacher size={16} color="currentColor" variant="TwoTone" />}
                      classNames={{
                        trigger: `flex items-center justify-center gap-2 p-3 hover:bg-default-200 hover:text-primary-primary group/karir rounded-md ${isCareerActive ? "bg-primary-primary" : ""}`,
                        titleWrapper: `${!open && "hidden"}`,
                        title: `xs:text-xs md:text-sm group-hover/karir:text-primary-primary  ${isCareerActive ? "text-background-primary" : "text-text-secondary"}`,
                        startContent: `group-hover/karir:text-primary-primary ${isCareerActive ? "text-background-primary" : "text-text-secondary"}`,
                        indicator: `group-hover/karir:text-primary-primary ${isCareerActive ? "text-background-primary" : "text-text-secondary"} ${!open && "hidden"}`,
                        content: `xs:pl-2 md:pl-8 pr-2 ${!open && "hidden"}`,
                      }}
                    >
                      <div className={`flex flex-col gap-2 py-2 `}>
                        {career.map((item, index) => (
                          <Link key={index} href={item.href} className={`xs:text-xs md:text-sm flex justify-between hover:text-primary-primary ${pathname.startsWith(item.href) ? "text-primary-primary" : "text-text-secondary"}`}>
                            <span>{item.label}</span>
                            {pathname.startsWith(item.href) && (
                              <div className="border border-primary-primary rounded-full p-1">
                                <div className="xs:h-1 md:h-2 xs:w-1 md:w-2  bg-primary-primary rounded-full"></div>
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </AccordionItem>
                  </Accordion>
                )}

                {/* Berita */}
                {!open ? (
                  <Tooltip content="Berita" placement="right-end" classNames={{ content: "bg-primary-border text-background-primary" }}>
                    <Link
                      className={`flex items-center gap-2 p-3 rounded-md group text-text-secondary xs:text-xs md:text-sm hover:text-primary-primary hover:bg-default-200 duration-300 ease-in-out  ${!open && "justify-center"} ${
                        pathname === "/berita" ? "bg-primary-primary text-background-primary" : ""
                      }`}
                      type="button"
                    >
                      <ClipboardText size={16} color="currentColor" variant="TwoTone" className="cursor-pointer" />
                      <span className={`${!open && "hidden"}`}>Berita</span>
                    </Link>
                  </Tooltip>
                ) : (
                  <Link
                    className={`flex items-center gap-2 p-3 rounded-md group cursor-pointer text-text-secondary xs:text-xs md:text-sm hover:text-primary-primary hover:bg-default-200 duration-300 ease-in-out ${
                      pathname === "/berita" ? "bg-primary-primary text-background-primary" : ""
                    }`}
                    href="/berita"
                  >
                    <ClipboardText size={16} color="currentColor" variant="TwoTone" />
                    <span>Berita</span>
                  </Link>
                )}

                {/* Profil CDC FTi */}
                {!open ? (
                  <Tooltip content="Profil CDC FTI" placement="right-end" classNames={{ content: "bg-primary-border text-background-primary" }}>
                    <Link
                      className={`flex items-center gap-2 p-3 rounded-md group text-text-secondary xs:text-xs md:text-sm hover:text-primary-primary hover:bg-default-200 duration-300 ease-in-out  ${!open && "justify-center"} ${
                        pathname === "/profil-cdc-fti" ? "bg-primary-primary text-background-primary" : ""
                      }`}
                      type="button"
                    >
                      <Courthouse size={16} color="currentColor" variant="TwoTone" className="cursor-pointer" />
                      <span className={`${!open && "hidden"}`}>Profil CDC FTI</span>
                    </Link>
                  </Tooltip>
                ) : (
                  <Link
                    className={`flex items-center gap-2 p-3 rounded-md group cursor-pointer text-text-secondary xs:text-xs md:text-sm hover:text-primary-primary hover:bg-default-200 duration-300 ease-in-out ${
                      pathname === "/profil-cdc-fti" ? "bg-primary-primary text-background-primary" : ""
                    }`}
                    href="/profil-cdc-fti"
                  >
                    <Courthouse size={16} color="currentColor" variant="TwoTone" />
                    <span>Profil CDC FTI</span>
                  </Link>
                )}

                {/* Pengguna */}
                {!open ? (
                  <Tooltip content="Pengguna" placement="right-end" classNames={{ content: "bg-primary-border text-background-primary" }}>
                    <Link
                      className={`flex items-center gap-2 p-3 rounded-md group text-text-secondary xs:text-xs md:text-sm hover:text-primary-primary hover:bg-default-200 duration-300 ease-in-out  ${!open && "justify-center"} ${
                        pathname.startsWith("/pengguna") ? "bg-primary-primary text-background-primary" : ""
                      }`}
                      type="button"
                    >
                      <People size={16} color="currentColor" variant="TwoTone" className="cursor-pointer" />
                      <span className={`${!open && "hidden"}`}>Pengguna</span>
                    </Link>
                  </Tooltip>
                ) : (
                  <Link
                    className={`flex items-center gap-2 p-3 rounded-md group cursor-pointer text-text-secondary xs:text-xs md:text-sm hover:text-primary-primary hover:bg-default-200 duration-300 ease-in-out ${
                      pathname.startsWith("/pengguna") ? "bg-primary-primary text-background-primary" : ""
                    }`}
                    href="/pengguna"
                  >
                    <People size={16} color="currentColor" variant="TwoTone" />
                    <span>Pengguna</span>
                  </Link>
                )}

                {/* Ruang Mahasiswa */}
                {!open ? (
                  <Tooltip content="Ruang Mahasiswa" placement="right-end" classNames={{ content: "bg-primary-border text-background-primary" }}>
                    <Link
                      className={`flex items-center gap-2 p-3 rounded-md group text-text-secondary xs:text-xs md:text-sm hover:text-primary-primary hover:bg-default-200 duration-300 ease-in-out  ${!open && "justify-center"} ${
                        pathname.startsWith("/ruang-mahasiswa") ? "bg-primary-primary text-background-primary" : ""
                      }`}
                      type="button"
                    >
                      <House2 size={16} color="currentColor" variant="TwoTone" className="cursor-pointer" />
                      <span className={`${!open && "hidden"}`}>Ruang Mahasiswa</span>
                    </Link>
                  </Tooltip>
                ) : (
                  <Link
                    className={`flex items-center gap-2 p-3 rounded-md group cursor-pointer text-text-secondary xs:text-xs md:text-sm hover:text-primary-primary hover:bg-default-200 duration-300 ease-in-out ${
                      pathname.startsWith("/ruang-mahasiswa") ? "bg-primary-primary text-background-primary" : ""
                    }`}
                    href="/ruang-mahasiswa"
                  >
                    <House2 size={16} color="currentColor" variant="TwoTone" />
                    <span>Ruang Mahasiswa</span>
                  </Link>
                )}

                {/* Perusahaan */}
                {!open ? (
                  <Tooltip content="Perusahaan" placement="right-end" classNames={{ content: "bg-primary-border text-background-primary" }}>
                    <Link
                      className={`flex items-center gap-2 p-3 rounded-md group text-text-secondary xs:text-xs md:text-sm hover:text-primary-primary hover:bg-default-200 duration-300 ease-in-out  ${!open && "justify-center"} ${
                        pathname.startsWith("/perusahaan") ? "bg-primary-primary text-background-primary" : ""
                      }`}
                      type="button"
                    >
                      <Briefcase size={16} color="currentColor" variant="TwoTone" className="cursor-pointer" />
                      <span className={`${!open && "hidden"}`}>Perusahaan</span>
                    </Link>
                  </Tooltip>
                ) : (
                  <Link
                    className={`flex items-center gap-2 p-3 rounded-md group cursor-pointer text-text-secondary xs:text-xs md:text-sm hover:text-primary-primary hover:bg-default-200 duration-300 ease-in-out ${
                      pathname.startsWith("/perusahaan") ? "bg-primary-primary text-background-primary" : ""
                    }`}
                    href="/perusahaan"
                  >
                    <Briefcase size={16} color="currentColor" variant="TwoTone" />
                    <span>Perusahaan</span>
                  </Link>
                )}

                {/* Lainnya */}
                {!open ? (
                  <Tooltip content="Lainnya" placement="right-end" classNames={{ content: "bg-primary-border text-background-primary" }}>
                    <div>
                      <Accordion className="w-full px-0">
                        <AccordionItem
                          aria-label="Lainnya"
                          title="Lainnya"
                          startContent={<More2 size={16} color="currentColor" variant="TwoTone" />}
                          classNames={{
                            trigger: `flex items-center justify-center gap-2 p-3 hover:bg-default-200 hover:text-primary-primary group/lainnya rounded-md ${isMoreActive ? "bg-primary-primary" : ""}`,
                            titleWrapper: `${!open && "hidden"}`,
                            title: `xs:text-xs md:text-sm group-hover/lainnya:text-primary-primary  ${isMoreActive ? "text-background-primary" : "text-text-secondary"}`,
                            startContent: `group-hover/lainnya:text-primary-primary ${isMoreActive ? "text-background-primary" : "text-text-secondary"}`,
                            indicator: `group-hover/lainnya:text-primary-primary ${isMoreActive ? "text-background-primary" : "text-text-secondary"} ${!open && "hidden"}`,
                            content: `pl-8 pr-2 ${!open && "hidden"}`,
                          }}
                        >
                          <div className={`flex flex-col gap-2 py-2 `}>
                            {more.map((item, index) => (
                              <Link key={index} href={item.href} className={`xs:text-xs md:text-sm flex justify-between hover:text-primary-primary ${pathname.startsWith(item.href) ? "text-primary-primary" : "text-text-secondary"}`}>
                                <span>{item.label}</span>
                                {pathname === item.href && (
                                  <div className="border border-primary-primary rounded-full p-1">
                                    <div className="h-2 w-2 bg-primary-primary rounded-full"></div>
                                  </div>
                                )}
                              </Link>
                            ))}
                          </div>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </Tooltip>
                ) : (
                  <Accordion className="w-full px-0">
                    <AccordionItem
                      aria-label="Lainnya"
                      title="Lainnya"
                      startContent={<More2 size={16} color="currentColor" variant="TwoTone" />}
                      classNames={{
                        trigger: `flex items-center justify-center gap-2 p-3 hover:bg-default-200 hover:text-primary-primary group/lainnya rounded-md ${isMoreActive ? "bg-primary-primary" : ""}`,
                        titleWrapper: `${!open && "hidden"}`,
                        title: `xs:text-xs md:text-sm group-hover/lainnya:text-primary-primary  ${isMoreActive ? "text-background-primary" : "text-text-secondary"}`,
                        startContent: `group-hover/lainnya:text-primary-primary ${isMoreActive ? "text-background-primary" : "text-text-secondary"}`,
                        indicator: `group-hover/lainnya:text-primary-primary ${isMoreActive ? "text-background-primary" : "text-text-secondary"} ${!open && "hidden"}`,
                        content: `xs:pl-2 md:pl-8 pr-2 ${!open && "hidden"}`,
                      }}
                    >
                      <div className={`flex flex-col gap-2 py-2 `}>
                        {more.map((item, index) => (
                          <Link key={index} href={item.href} className={`xs:text-xs md:text-sm flex justify-between hover:text-primary-primary ${pathname.startsWith(item.href) ? "text-primary-primary" : "text-text-secondary"}`}>
                            <span>{item.label}</span>
                            {pathname.startsWith(item.href) && (
                              <div className="border border-primary-primary rounded-full p-1">
                                <div className="xs:h-1 md:h-2 xs:w-1 md:w-2  bg-primary-primary rounded-full"></div>
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </AccordionItem>
                  </Accordion>
                )}
              </>
            )}
          </div>

          {/* Pengaturan & Keluar */}
          <div className="flex flex-col gap-2 w-full">
            {/* Pengaturan */}
            {!open ? (
              <Tooltip content="Pengaturan" placement="right-end" classNames={{ content: "bg-primary-border text-background-primary" }}>
                <Link
                  className={`flex items-center gap-2 p-3 rounded-md group text-text-secondary xs:text-xs md:text-sm hover:text-primary-primary hover:bg-default-200 duration-300 ease-in-out  ${!open && "justify-center"} ${
                    pathname.startsWith("/pengaturan") ? "bg-primary-primary text-background-primary" : ""
                  }`}
                  type="button"
                >
                  <Setting size={16} color="currentColor" variant="TwoTone" className="cursor-pointer" />
                  <span className={`${!open && "hidden"}`}>Pengaturan</span>
                </Link>
              </Tooltip>
            ) : (
              <Link
                className={`flex items-center gap-2 p-3 rounded-md group cursor-pointer text-text-secondary xs:text-xs md:text-sm hover:text-primary-primary hover:bg-default-200 duration-300 ease-in-out ${
                  pathname.startsWith("/pengaturan") ? "bg-primary-primary text-background-primary" : ""
                }`}
                href="/pengaturan"
              >
                <Setting size={16} color="currentColor" variant="TwoTone" />
                <span>Pengaturan</span>
              </Link>
            )}

            {/* Keluar */}
            {!open ? (
              <Tooltip content="Keluar" placement="right-end" classNames={{ content: "bg-danger-hover text-white" }}>
                <button className={`w-full flex items-center gap-2 p-3 rounded-md text-danger-primary xs:text-xs md:text-sm hover:text-white hover:bg-danger-hover duration-300 ease-in-out ${!open ? "justify-center" : ""}`}>
                  <Logout size={16} color="currentColor" variant="TwoTone" />
                  <span className={`${!open && "hidden"}`}>Keluar</span>
                </button>
              </Tooltip>
            ) : (
              <button
                onClick={async () => {
                  const result = await showConfirmationLogoutDialog();
                  if (result.isConfirmed) {
                    try {
                      await logout();
                      await showSuccessLogoutDialog();
                      router.replace("/");
                    } catch (err) {
                      await showErrorDialog("Gagal logout. Silakan coba lagi.");
                    }
                  }
                }}
                className={`w-full flex items-center gap-2 p-3 rounded-md text-danger-primary xs:text-xs md:text-sm hover:text-white hover:bg-danger-hover duration-300 ease-in-out`}
              >
                <Logout size={16} color="currentColor" variant="TwoTone" />
                <span>Keluar</span>
              </button>
            )}
          </div>
        </nav>
      </>
    </>
  );
}
