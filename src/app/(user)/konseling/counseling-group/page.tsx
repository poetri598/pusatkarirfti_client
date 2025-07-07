"use client";
import React from "react";
// Components
import PageKonselingGroupUser from "@/components/User/Konseling/PageKonselingGroup";

// Utils
import { useAuth } from "@/context/AuthContext";

export default function Konseling() {
  const { user } = useAuth();

  return user?.role_name === "Mahasiswa" || user?.role_name === "Alumni" ? <PageKonselingGroupUser /> : null;
}
