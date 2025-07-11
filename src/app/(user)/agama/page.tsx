"use client";
import React from "react";

// Components
import PageAdmin from "@/components/Admin/Agama/Page";
import PageNotFound from "@/components/Custom/PageNotFound";

// Utils
import { useAuth } from "@/context/AuthContext";

export default function Expo() {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageAdmin /> : <PageNotFound />;
}
