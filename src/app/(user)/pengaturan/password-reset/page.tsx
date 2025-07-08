"use client";
import React from "react";
// Components
import PagePasswordResetUser from "@/components/User/Pengaturan/PagePasswordReset";
import PagePasswordResetAdmin from "@/components/Admin/Pengaturan/PagePasswordReset";

// Utils
import { useAuth } from "@/context/AuthContext";

export default function Pengaturan() {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PagePasswordResetAdmin /> : <PagePasswordResetUser />;
}
