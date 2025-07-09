"use client";
import "@/styles/globals.css";
import { useState } from "react";

import Sidebar from "@/components/HeaderFooter/Sidebar";
import NavbarAdmin from "@/components/HeaderFooter/NavbarAdmin";

export default function LayoutAdmin({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-screen overflow-hidden">
      {/* Sidebar tetap fixed */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Konten utama */}
      <div className={`flex-1 min-h-screen overflow-hidden duration-300 transition-all ${open ? "pl-48 md:pl-72" : "pl-20"}`}>
        <NavbarAdmin />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
