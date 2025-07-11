"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/Industri/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ industry_id }: { industry_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail industry_id={industry_id} /> : <PageNotFound />;
}
