"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/Platform/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ platform_id }: { platform_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail platform_id={platform_id} /> : <PageNotFound />;
}
