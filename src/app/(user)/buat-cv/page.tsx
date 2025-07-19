"use client";
import React from "react";

// Components
import PageUser from "@/components/User/BuatCV/Page";
import PageAdmin from "@/components/Admin/BuatCV/Page";

// Utils
import { useAuth } from "@/context/AuthContext";

export default function Expo() {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageAdmin /> : <PageUser />;
}
