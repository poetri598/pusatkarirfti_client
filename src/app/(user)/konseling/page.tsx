"use client";
import React from "react";
// Components
import PageKonselingUser from "@/components/User/Konseling/PageKonseling";
import PageKonselingAdmin from "@/components/Admin/Konseling/PageKonseling";

// Utils
import { useAuth } from "@/context/AuthContext";

export default function Konseling() {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageKonselingAdmin /> : <PageKonselingUser />;
}
