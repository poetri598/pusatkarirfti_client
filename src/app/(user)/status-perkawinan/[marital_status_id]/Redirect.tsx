"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/StatusPerkawinan/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ marital_status_id }: { marital_status_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail marital_status_id={marital_status_id} /> : <PageNotFound />;
}
