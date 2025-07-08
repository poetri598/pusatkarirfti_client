"use client";
import React from "react";
// Components
import PageProfilSayaUser from "@/components/User/ProfilSaya/PageProfileSaya";
import PageProfilSayaAdmin from "@/components/Admin/ProfilSaya/PageProfileSaya";

// Utils
import { useAuth } from "@/context/AuthContext";

export default function ProfilSaya() {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageProfilSayaAdmin /> : <PageProfilSayaUser />;
}
