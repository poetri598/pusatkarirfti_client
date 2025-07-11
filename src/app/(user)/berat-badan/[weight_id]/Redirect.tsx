"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/BeratBadan/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ weight_id }: { weight_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail weight_id={weight_id} /> : <PageNotFound />;
}
