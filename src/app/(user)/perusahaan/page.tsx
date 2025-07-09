"use client";
import React from "react";

// Components
import PagePerusahaanAdmin from "@/components/Admin/Perusahaan/PagePerusahaan";
import PageNotFound from "@/components/Custom/PageNotFound";

// Utils
import { useAuth } from "@/context/AuthContext";

export default function Perusahaan() {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PagePerusahaanAdmin /> : <PageNotFound />;
}
