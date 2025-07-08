"use client";
import React, { useState, useEffect } from "react";
import "@/styles/globals.css";

// Iconsax
import { Notification, ReceiptAdd } from "iconsax-react";

// NextJS
import { usePathname } from "next/navigation";

// Components
import { Navbar, NavbarContent, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Badge, Link, Tooltip } from "@heroui/react";

// Context
import { useAuth } from "@/context/AuthContext";

// Services
import { countUnreadCounselings, countUnapprovedCounselings } from "@/services/counseling";

export const profile = [
  { label: "Profil Saya", href: "/profil-saya" },
  { label: "Buat CV", href: "/buat-cv" },
];

export default function NavbarAdmin() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [unapprovedCount, setUnapprovedCount] = useState<number>(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const unreadRes = await countUnreadCounselings();
      if (unreadRes.success) setUnreadCount(unreadRes.data ?? 0);

      const unapprovedRes = await countUnapprovedCounselings();
      if (unapprovedRes.success) setUnapprovedCount(unapprovedRes.data ?? 0);
    };

    fetchCounts();
  }, []);

  return (
    <Navbar
      position="sticky"
      isBordered
      classNames={{
        base: "bg-background-primary overflow-hidden py-2 px-8  z-50",
        wrapper: "flex items-center justify-between max-w-full px-0",
        item: [
          "flex",
          "relative",
          "h-full",
          "pb-2",
          "items-center",
          "text-primary-primary",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary-primary",
          "data-[active=true]:text-primary-primary",
        ],
      }}
    >
      <NavbarContent as="div" justify="end">
        <Tooltip
          content="Belum Dibaca"
          placement="bottom-end"
          classNames={{
            content: "text-xs text-background-primary bg-primary-primary",
          }}
        >
          <Badge color="default" content={unreadCount} variant="solid" classNames={{ badge: "bg-orange-500 text-white" }}>
            <Link href="/konseling">
              <Notification size={28} color="currentColor" variant="Bold" className="text-primary-primary" />
            </Link>
          </Badge>
        </Tooltip>

        <Tooltip
          content="Belum Disetujui"
          placement="bottom-end"
          classNames={{
            content: "text-xs text-background-primary bg-primary-primary",
          }}
        >
          <Badge color="default" content={unapprovedCount} variant="solid" classNames={{ badge: "bg-orange-500 text-white" }}>
            <Link href="/konseling">
              <ReceiptAdd size={28} color="currentColor" variant="Bold" className="text-primary-primary" />
            </Link>
          </Badge>
        </Tooltip>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <div className="flex justify-center items-center gap-2 cursor-pointer px-4 py-2 border border-default-200 hover:bg-default-200 rounded-full">
              {user?.user_img ? <Avatar as="button" className="transition-transforms " color="secondary" size="sm" src={user?.user_img} /> : null}
              <div className="flex-col xs:hidden md:flex">
                {" "}
                <span className="text-xs  text-text-secondary capitalize">{user?.role_name}</span>
                <span className="text-xs font-semibold  text-text-primary capitalize">{user?.user_fullname}</span>
              </div>
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat" classNames={{ list: "xs:text-xs md:text-sm " }}>
            {profile.map((item, index) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <DropdownItem
                  key={index}
                  href={item.href}
                  classNames={{
                    base: `data-[hover=true]:text-primary-primary  ${isActive ? "text-primary-primary font-medium" : "text-text-secondary "} `,
                    title: "xs:text-xs md:text-sm",
                  }}
                >
                  {item.label}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
