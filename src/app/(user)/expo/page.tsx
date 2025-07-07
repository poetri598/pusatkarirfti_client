"use client";
import React from "react";

// Components
import PageExpoUser from "@/components/User/Expo/PageExpo";
import PageExpoAdmin from "@/components/Admin/Expo/PageExpo";

// Utils
import { useAuth } from "@/context/AuthContext";

export default function Expo() {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageExpoAdmin /> : <PageExpoUser />;
}
