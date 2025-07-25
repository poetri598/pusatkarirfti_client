"use client";
import React from "react";
// Components
import PageEmailResetUser from "@/components/User/Pengaturan/PageEmailReset";
import PageEmailResetAdmin from "@/components/Admin/Pengaturan/PageEmailReset";

// Utils
import { useAuth } from "@/context/AuthContext";

export default function Pengaturan() {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageEmailResetAdmin /> : <PageEmailResetUser />;
}
