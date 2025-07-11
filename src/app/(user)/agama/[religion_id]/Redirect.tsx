"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/Agama/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ religion_id }: { religion_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail religion_id={religion_id} /> : <PageNotFound />;
}
