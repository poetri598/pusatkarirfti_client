"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/TinggiBadan/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ height_id }: { height_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail height_id={height_id} /> : <PageNotFound />;
}
