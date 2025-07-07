"use client";
import React from "react";

// Components
import PageMagangUser from "@/components/User/Magang/PageMagang";
import PageMagangAdmin from "@/components/Admin/Magang/PageMagang";

// Utils
import { useAuth } from "@/context/AuthContext";

export default function Magang() {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageMagangAdmin /> : <PageMagangUser />;
}
