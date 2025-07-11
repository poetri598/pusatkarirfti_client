"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/TipeExpo/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ expo_type_id }: { expo_type_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail expo_type_id={expo_type_id} /> : <PageNotFound />;
}
