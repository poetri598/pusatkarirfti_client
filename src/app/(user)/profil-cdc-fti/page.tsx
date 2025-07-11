"use client";
import React from "react";

import { Spinner } from "@heroui/react";

// Components
import PageProfilCDCFTIUser from "@/components/User/ProfilCDCFTI/Page";
import PageProfilCDCFTIAdmin from "@/components/Admin/ProfiCDCFTI/Page";

// Utils
import { useAuth } from "@/context/AuthContext";

export default function ProfilCDCFTI() {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageProfilCDCFTIAdmin /> : <PageProfilCDCFTIUser />;
}
