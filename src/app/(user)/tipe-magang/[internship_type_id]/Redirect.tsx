"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/TipeMagang/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ internship_type_id }: { internship_type_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail internship_type_id={internship_type_id} /> : <PageNotFound />;
}
