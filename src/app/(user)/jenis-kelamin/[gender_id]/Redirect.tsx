"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/JenisKelamin/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ gender_id }: { gender_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail gender_id={gender_id} /> : <PageNotFound />;
}
