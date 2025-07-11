"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/TipePelatihan/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ training_type_id }: { training_type_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail training_type_id={training_type_id} /> : <PageNotFound />;
}
