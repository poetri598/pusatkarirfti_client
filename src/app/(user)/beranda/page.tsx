"use client";
import React from "react";

import { Spinner } from "@heroui/react";

// Components
import PageBerandaUser from "@/components/User/Beranda/PageBerandaUser";
import PageBerandaAdmin from "@/components/Admin/Beranda/Page";

// Utils
import { useAuth } from "@/context/AuthContext";

export default function Beranda() {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageBerandaAdmin /> : <PageBerandaUser />;
}
