"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/Mode/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ mode_id }: { mode_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail mode_id={mode_id} /> : <PageNotFound />;
}
