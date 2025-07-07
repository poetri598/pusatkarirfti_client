"use client";
import React from "react";

// Components
import PagePelatihanUser from "@/components/User/Pelatihan/PagePelatihan";
import PagePelatihanAdmin from "@/components/Admin/Pelatihan/PagePelatihan";

// Utils
import { useAuth } from "@/context/AuthContext";

export default function Pelatihan() {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PagePelatihanAdmin /> : <PagePelatihanUser />;
}
