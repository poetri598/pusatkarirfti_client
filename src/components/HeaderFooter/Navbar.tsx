"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

// Iconsax
import { ArrowDown2, ArrowRight2 } from "iconsax-react";

// Components
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Accordion, AccordionItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@heroui/react";
import Logo from "./Logo";
import { useRouter } from "next/navigation";
import { showConfirmationLogoutDialog, showSuccessLogoutDialog, showErrorDialog } from "@/components/Custom/AlertButton";
import { useAuth } from "@/context/AuthContext";

// Dummy
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

const profile = [
  { label: "Profil Saya", href: "/profil-saya" },
  { label: "Buat CV", href: "/buat-cv" },
  { label: "Pengaturan", href: "/pengaturan" },
  { label: "Keluar", action: "logout" },
];
const signup = [
  { label: "Mahasiswa", href: "/daftar-mahasiswa" },
  { label: "Alumni", href: "/daftar-alumni" },
  { label: "Perusahaan", href: "/daftar-perusahaan" },
];

export default function NavbarApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isCareerActive = career.some((item) => pathname.startsWith(item.href));
  const isAboutUsActive = about_us.some((item) => pathname.startsWith(item.href));

  const { user, logout } = useAuth();

  const router = useRouter();

  return (
    <Navbar
      position="sticky"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        base: "bg-background-primary xs:py-2 lg:py-8 z-50",
        wrapper: "max-w-full px-0 xs:w-11/12 xl:w-10/12 flex items-center justify-between ",
        item: [
          "flex relative h-full items-center text-primary-primary data-[active=true]:after:content-[''] data-[active=true]:after:absolute data-[active=true]:after:-bottom-2 data-[active=true]:after:left-0 data-[active=true]:after:right-0 data-[active=true]:after:h-[4px] data-[active=true]:after:rounded-[4px] data-[active=true]:after:bg-primary-primary data-[active=true]:text-primary-primary data-[active=true]:font-bold",
        ],
      }}
    >
      {/* Logo & Menu Toggle */}
      <NavbarContent className="xs:px-2 lg:px-0">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="xs:block lg:hidden" />
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      {/* Menu & Masuk-Daftar & Avatar */}
      <div className="flex gap-8">
        {/* Menu */}
        <NavbarContent className="xs:hidden lg:flex">
          {/* Beranda */}
          <NavbarItem isActive={pathname.startsWith("/beranda")} className="text-text-secondary">
            <Link href="/beranda" className="text-sm hover:text-primary-primary">
              Beranda
            </Link>
          </NavbarItem>

          {/* Karir */}
          <Dropdown>
            <NavbarItem isActive={isCareerActive} className="text-text-secondary">
              <DropdownTrigger>
                <Button
                  data-active={isCareerActive}
                  disableRipple
                  className="p-0 bg-transparent group text-sm text-text-secondary 
             data-[hover=true]:bg-transparent 
             data-[active=true]:text-primary-primary hover:text-primary-primary "
                  endContent={<ArrowDown2 size={16} color="currentColor" className="group-hover:rotate-180" />}
                  radius="md"
                  variant="light"
                >
                  Karir
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="Karir"
              itemClasses={{
                base: "gap-4 text-text-secondary",
              }}
            >
              {career.map((item, index) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <DropdownItem
                    key={index}
                    href={item.href}
                    classNames={{
                      base: `text-text-secondary data-[hover=true]:text-primary-primary ${isActive ? "text-primary-primary" : ""}`,
                    }}
                  >
                    {item.label}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>

          {/* Berita */}
          <NavbarItem isActive={pathname.startsWith("/berita")} className="text-text-secondary">
            <Link href="/berita" className="text-sm hover:text-primary-primary">
              Berita
            </Link>
          </NavbarItem>

          {/* Tracer Study */}
          <NavbarItem isActive={pathname.startsWith("/tracer-study")} className="text-text-secondary ">
            <Link href="/tracer-study" className=" text-sm hover:text-primary-primary">
              Tracer Study
            </Link>
          </NavbarItem>

          {/* Tentang Kami */}
          <Dropdown>
            <NavbarItem isActive={isAboutUsActive} className="text-text-secondary">
              <DropdownTrigger>
                <Button
                  data-active={isAboutUsActive}
                  disableRipple
                  className="p-0 bg-transparent group text-sm text-text-secondary 
             data-[hover=true]:bg-transparent 
             data-[active=true]:text-primary-primary hover:text-primary-primary"
                  endContent={<ArrowDown2 size={16} color="currentColor" className="group-hover:rotate-180" />}
                  radius="md"
                  variant="light"
                >
                  Tentang Kami
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu aria-label="Tentang Kami">
              {about_us.map((item, index) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <DropdownItem
                    key={index}
                    href={item.href}
                    classNames={{
                      base: `text-text-secondary data-[hover=true]:text-primary-primary ${isActive ? "text-primary-primary font-medium" : ""}`,
                    }}
                  >
                    {item.label}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>

        {user ? (
          // Avatar
          <NavbarContent as="div">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <div className="flex items-center gap-2 cursor-pointer hover:bg-default-200 rounded-full px-4 py-2">
                  <Avatar isBordered as="button" className="transition-transforms ring-2 ring-offset-2 ring-offset-background dark:ring-offset-background-dark ring-primary-primary" color="secondary" size="sm" src={user.user_img} />
                  <span className="text-sm  text-text-primarys">{user.user_fullname}</span>
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                {profile.map((item, index) => {
                  const isActive = item.href && pathname.startsWith(item.href);
                  const isLogout = item.action === "logout";

                  if (isLogout) {
                    return (
                      <DropdownItem
                        key={index}
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
                        classNames={{
                          base: "cursor-pointer text-danger-primary data-[hover=true]:text-white data-[hover=true]:bg-danger-primary",
                        }}
                      >
                        {item.label}
                      </DropdownItem>
                    );
                  }

                  if (isActive) {
                    return (
                      <DropdownItem
                        key={index}
                        href={item.href}
                        classNames={{
                          base: `data-[hover=true]:text-primary-primary ${isActive ? "text-primary-primary font-bold" : "text-text-secondary "} `,
                        }}
                      >
                        {item.label}
                      </DropdownItem>
                    );
                  }

                  return (
                    <DropdownItem
                      key={index}
                      href={item.href}
                      classNames={{
                        base: `data-[hover=true]:text-primary-primary ${isActive ? "text-primary-primary font-medium" : "text-text-secondary "} ${
                          isLogout ? "text-danger-primary data-[hover=true]:text-white data-[hover=true]:bg-danger-primary" : "text-text-secondary"
                        }`,
                      }}
                    >
                      {item.label}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        ) : (
          // Masuk & Daftar
          <NavbarContent className="flex gap-2 ">
            <NavbarItem>
              <Link href="/masuk" className="login active:opacity-100 border">
                Masuk
              </Link>
            </NavbarItem>

            <Dropdown classNames={{ base: "bg-transparent gap-4", content: "bg-transparent shadow-none" }}>
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="text-sm font-medium  px-4 py-2 h-auto bg-secondary-primary text-primary-primary data-[hover=true]:bg-background-primary data-[hover=true]:text-primary-primary group gap-1"
                    endContent={<ArrowRight2 size={20} color="currentColor" className="group-hover:rotate-90" />}
                    radius="md"
                    variant="light"
                  >
                    Daftar
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu>
                {signup.map((item, index) => (
                  <DropdownItem
                    key={index}
                    href={item.href}
                    classNames={{
                      base: "signup  data-[hover=true]:transition-colors data-[hover=true]:bg-secondary-surface data-[hover=true]:text-primary-primary",
                    }}
                  >
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        )}
      </div>

      {/* Mobile */}
      <NavbarMenu className="z-40 !h-full top-16 gap-0 bg-background-primary xs:block lg:hidden">
        {/* Beranda */}
        <NavbarMenuItem isActive={pathname.startsWith("/beranda")} className="text-text-secondary data-[active=true]:text-primary-primary data-[active=true]:font-bold hover:bg-default-200 hover:text-primary-primary py-2 px-3">
          <Link className="w-full text-sm" href="/beranda">
            Beranda
          </Link>
        </NavbarMenuItem>

        {/* Karir */}
        <NavbarMenuItem isActive={isCareerActive} className="py-0 px-0 ">
          <Accordion className="w-full  px-0 ">
            <AccordionItem
              aria-label="Karir"
              title="Karir"
              classNames={{
                trigger: ` flex items-center px-3 py-2 gap-2 hover:bg-default-200 group/menu ${isCareerActive ? "bg-primary-primary" : ""}`,
                titleWrapper: "flex-none",
                title: `text-sm group-hover/menu:text-primary-primary ${isCareerActive ? "text-background-primary" : "text-text-secondary"}`,
                indicator: `group-hover/menu:text-primary-primary ${isCareerActive ? "text-background-primary" : "text-text-secondary"}`,
                content: "pl-4",
              }}
            >
              <div className="flex flex-col gap-2">
                {career.map((item, index) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link key={index} href={item.href} className={`text-sm flex items-center gap-4 hover:text-primary-primary ${isActive ? "text-primary-primary" : "text-text-secondary"}`}>
                      <span>{item.label}</span>
                      {isActive && (
                        <div className="border border-primary-primary rounded-full p-1">
                          <div className="h-2 w-2 bg-primary-primary rounded-full" />
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </AccordionItem>
          </Accordion>
        </NavbarMenuItem>

        {/* Berita */}
        <NavbarMenuItem isActive={pathname.startsWith("/berita")} className="text-text-secondary data-[active=true]:text-primary-primary data-[active=true]:font-bold hover:bg-default-200 hover:text-primary-primary py-2 px-3">
          <Link className="w-full text-sm" href="/berita">
            Berita
          </Link>
        </NavbarMenuItem>

        {/* Tracer Study */}
        <NavbarMenuItem isActive={pathname.startsWith("/tracer-study")} className="text-text-secondary data-[active=true]:text-primary-primary data-[active=true]:font-bold hover:bg-default-200 hover:text-primary-primary py-2 px-3">
          <Link className="w-full text-sm" href="/tracer-study">
            Tracer Study
          </Link>
        </NavbarMenuItem>

        {/* Tentang Kami */}
        <NavbarMenuItem isActive={isAboutUsActive} className="py-0 px-0">
          <Accordion className="w-full px-0">
            <AccordionItem
              aria-label="Tentang Kami"
              title="Tentang Kami"
              classNames={{
                trigger: `flex items-center px-3 py-2 gap-2 hover:bg-default-200 group/menu ${isAboutUsActive ? "bg-primary-primary" : ""}`,
                titleWrapper: "flex-none",
                title: `text-sm group-hover/menu:text-primary-primary ${isAboutUsActive ? "text-background-primary" : "text-text-secondary"}`,
                indicator: `group-hover/menu:text-primary-primary ${isAboutUsActive ? "text-background-primary" : "text-text-secondary"}`,
                content: "pl-4",
              }}
            >
              <div className="flex flex-col gap-2">
                {about_us.map((item, index) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link key={index} href={item.href} className={`text-sm flex items-center gap-4 hover:text-primary-primary ${isActive ? "text-primary-primary" : "text-text-secondary"}`}>
                      <span>{item.label}</span>
                      {isActive && (
                        <div className="border border-primary-primary rounded-full p-1">
                          <div className="h-2 w-2 bg-primary-primary rounded-full" />
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </AccordionItem>
          </Accordion>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
