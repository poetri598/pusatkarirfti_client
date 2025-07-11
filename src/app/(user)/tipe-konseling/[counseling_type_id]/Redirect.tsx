"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/TipeKonseling/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ counseling_type_id }: { counseling_type_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail counseling_type_id={counseling_type_id} /> : <PageNotFound />;
}
