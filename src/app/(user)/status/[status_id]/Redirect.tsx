"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/Status/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ status_id }: { status_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail status_id={status_id} /> : <PageNotFound />;
}
