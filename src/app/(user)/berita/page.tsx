"use client";
import React from "react";

// Components
import PageBeritaUser from "@/components/User/Berita/PageBerita";
import PageBeritaAdmin from "@/components/Admin/Berita/PageBerita";

// Utils
import { useAuth } from "@/context/AuthContext";

export default function Berita() {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageBeritaAdmin /> : <PageBeritaUser />;
}
