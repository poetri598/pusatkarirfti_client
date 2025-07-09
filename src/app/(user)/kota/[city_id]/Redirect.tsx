"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/Kota/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ city_id }: { city_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail city_id={city_id} /> : <PageNotFound />;
}
