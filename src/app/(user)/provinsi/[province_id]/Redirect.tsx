"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/Provinsi/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ province_id }: { province_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail province_id={province_id} /> : <PageNotFound />;
}
