"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/Negara/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ country_id }: { country_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail country_id={country_id} /> : <PageNotFound />;
}
