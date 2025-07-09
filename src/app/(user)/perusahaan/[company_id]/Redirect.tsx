"use client";
import { useAuth } from "@/context/AuthContext";
import PagePerusahaanDetailAdmin from "@/components/Admin/Perusahaan/PagePerusahaanDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ company_id }: { company_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PagePerusahaanDetailAdmin company_id={company_id} /> : <PageNotFound />;
}
