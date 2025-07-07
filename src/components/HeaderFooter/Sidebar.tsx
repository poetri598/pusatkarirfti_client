"use client";

// NextJS
import { usePathname } from "next/navigation";
import Image from "next/image";

// Iconsax
import { Teacher, Courthouse, ClipboardText, Graph, Logout, People, Setting2, SidebarRight, SearchNormal1, Setting } from "iconsax-react";

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

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isCareerActive = career.some((item) => pathname.startsWith(item.href));
  const isAboutUsActive = about_us.some((item) => pathname.startsWith(item.href));

  const { logout } = useAuth();

  return (
    <>
      <>
        <nav className={`fixed top-0 left-0 z-[999] bg-background-primary h-full p-4 duration-300 ease-in-out flex flex-col xs:items-start md:justify-between border border-default-200 gap-2 ${open ? "xs:w-48 md:w-72" : "w-20"}`}>
          {/* Toggle Icon */}
          <SidebarRight
            size={32}
            color="currentColor"
            variant="Linear"
            className={`absolute cursor-pointer -right-4 top-40 text-primary-primary p-1 border border-default-200 bg-background-primary rounded-md duration-300 hover:bg-default-200 ${open ? "rotate-180" : "rotate-0"}`}
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
                    placeholder="Cari..."
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
                endContent={<SearchNormal1 size={16} color="currentColor" variant="TwoTone" className="text-text-secondary cursor-pointer" />}
                labelPlacement="inside"
                placeholder="Cari..."
                variant="bordered"
                type="search"
                classNames={{
                  base: "cursor-pointer",
                  mainWrapper: "cursor-pointer",
                  innerWrapper: "flex items-center justify-center cursor-pointer",
                  input: "placeholder:text-text-secondary placeholder:xs:text-xs placeholder:md:text-sm !text-text-secondary focus:!border-primary-primary duration-300 block",
                  inputWrapper: "group-data-[focus=true]:border-primary-primary hover:!border-primary-primary",
                }}
              />
            )}
          </div>

          {/* Menu */}
          <div className="flex flex-col gap-2 flex-2 overflow-y-auto p-1  h-full w-full ">
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

            {/* Tentang Kami */}
            {!open ? (
              <Tooltip content="Tentang Kami" placement="right-end" classNames={{ content: "bg-primary-border text-background-primary" }}>
                <div>
                  <Accordion className="w-full px-0">
                    <AccordionItem
                      aria-label="Tentang Kami"
                      title="Tentang Kami"
                      startContent={<Courthouse size={16} color="currentColor" variant="TwoTone" />}
                      classNames={{
                        trigger: `flex items-center justify-center gap-2 p-3 hover:bg-default-200 hover:text-primary-primary group/tentang-kami rounded-md ${isAboutUsActive ? "bg-primary-primary" : ""}`,
                        titleWrapper: `${!open && "hidden"}`,
                        title: `xs:text-xs md:text-sm group-hover/tentang-kami:text-primary-primary  ${isAboutUsActive ? "text-background-primary" : "text-text-secondary"}`,
                        startContent: `group-hover/tentang-kami:text-primary-primary ${isAboutUsActive ? "text-background-primary" : "text-text-secondary"}`,
                        indicator: `group-hover/tentang-kami:text-primary-primary ${isAboutUsActive ? "text-background-primary" : "text-text-secondary"} ${!open && "hidden"}`,
                        content: `pl-8 pr-2 ${!open && "hidden"}`,
                      }}
                    >
                      <div className={`flex flex-col gap-2 py-2 `}>
                        {about_us.map((item, index) => (
                          <Link key={index} href={item.href} className={`xs:text-xs md:text-sm flex justify-between hover:text-primary-primary ${pathname.startsWith(item.href) ? "text-primary-primary" : "text-text-secondary"}`}>
                            <span>{item.label}</span>
                            {pathname.startsWith(item.href) && (
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
                  aria-label="Tentang Kami"
                  title="Tentang Kami"
                  startContent={<Courthouse size={16} color="currentColor" variant="TwoTone" />}
                  classNames={{
                    trigger: `flex items-center justify-center gap-2 p-3 hover:bg-default-200 hover:text-primary-primary group/tentang-kami rounded-md ${isAboutUsActive ? "bg-primary-primary" : ""}`,
                    titleWrapper: `${!open && "hidden"}`,
                    title: `xs:text-xs md:text-sm group-hover/tentang-kami:text-primary-primary  ${isAboutUsActive ? "text-background-primary" : "text-text-secondary"}`,
                    startContent: `group-hover/tentang-kami:text-primary-primary ${isAboutUsActive ? "text-background-primary" : "text-text-secondary"}`,
                    indicator: `group-hover/tentang-kami:text-primary-primary ${isAboutUsActive ? "text-background-primary" : "text-text-secondary"} ${!open && "hidden"}`,
                    content: `xs:pl-2 md:pl-8 pr-2 ${!open && "hidden"}`,
                  }}
                >
                  <div className={`flex flex-col gap-2 py-2 `}>
                    {about_us.map((item, index) => (
                      <Link key={index} href={item.href} className={`xs:text-xs md:text-sm flex justify-between hover:text-primary-primary ${pathname.startsWith(item.href) ? "text-primary-primary" : "text-text-secondary"}`}>
                        <span>{item.label}</span>
                        {pathname.startsWith(item.href) && (
                          <div className="border border-primary-primary rounded-full p-1">
                            <div className="h-2 w-2  bg-primary-primary rounded-full"></div>
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </AccordionItem>
              </Accordion>
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
