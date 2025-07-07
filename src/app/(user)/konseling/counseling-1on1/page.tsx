"use client";
import React from "react";
// Components
import PageKonseling1On1User from "@/components/User/Konseling/PagKonseling1On1";

// Utils
import { useAuth } from "@/context/AuthContext";

export default function Konseling() {
  const { user } = useAuth();

  return user?.role_name === "Mahasiswa" || user?.role_name === "Alumni" ? <PageKonseling1On1User /> : null;
}
