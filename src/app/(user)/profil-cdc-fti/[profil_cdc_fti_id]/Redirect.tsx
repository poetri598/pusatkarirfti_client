"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/ProfiCDCFTI/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ profil_cdc_fti_id }: { profil_cdc_fti_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail profil_cdc_fti_id={profil_cdc_fti_id} /> : <PageNotFound />;
}
