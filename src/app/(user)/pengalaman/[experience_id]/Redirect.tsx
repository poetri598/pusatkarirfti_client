"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/Pengalaman/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ experience_id }: { experience_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail experience_id={experience_id} /> : <PageNotFound />;
}
