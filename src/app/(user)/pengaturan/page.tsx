"use client";
import React from "react";
// Components
import PagePengaturanUser from "@/components/User/Pengaturan/PagePengaturan";
import PagePengaturanAdmin from "@/components/Admin/Pengaturan/PagePengaturan";

// Utils
import { useAuth } from "@/context/AuthContext";

export default function Pengaturan() {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PagePengaturanAdmin /> : <PagePengaturanUser />;
}
