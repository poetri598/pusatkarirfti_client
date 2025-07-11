"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/IPK/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ ipk_id }: { ipk_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail ipk_id={ipk_id} /> : <PageNotFound />;
}
