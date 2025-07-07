"use client";
import React from "react";
// Components
import PageLowonganPekerjaanUser from "@/components/User/LowonganPekerjaan/PageLowonganPekerjaan";
import PageLowonganPekerjaanAdmin from "@/components/Admin/LowonganPekerjaan/PageLowonganPekerjaan";

// Utils
import { useAuth } from "@/context/AuthContext";

export default function LowonganPekerjaan() {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageLowonganPekerjaanAdmin /> : <PageLowonganPekerjaanUser />;
}
