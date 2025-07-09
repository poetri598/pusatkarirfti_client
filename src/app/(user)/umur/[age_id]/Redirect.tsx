"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/Umur/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ age_id }: { age_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail age_id={age_id} /> : <PageNotFound />;
}
