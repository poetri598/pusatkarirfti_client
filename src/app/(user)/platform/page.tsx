"use client";
import React from "react";

// Components
import Page from "@/components/Admin/Platform/Page";
import PageNotFound from "@/components/Custom/PageNotFound";

// Utils
import { useAuth } from "@/context/AuthContext";

export default function page() {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <Page /> : <PageNotFound />;
}
