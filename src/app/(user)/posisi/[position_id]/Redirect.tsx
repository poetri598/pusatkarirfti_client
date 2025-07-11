"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/Posisi/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ position_id }: { position_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail position_id={position_id} /> : <PageNotFound />;
}
