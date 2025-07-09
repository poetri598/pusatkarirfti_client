"use client";
import React from "react";

// Components
import PageRuangMahasiswaAdmin from "@/components/Admin/RuangMahasiswa/PageRuangMahasiswa";
import PageNotFound from "@/components/Custom/PageNotFound";

// Utils
import { useAuth } from "@/context/AuthContext";

export default function RuangMahasiswa() {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageRuangMahasiswaAdmin /> : <PageNotFound />;
}
