"use client";
import { useAuth } from "@/context/AuthContext";
import PageKonselingDetailAdmin from "@/components/Admin/Konseling/PageKonselingDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ counseling_id }: { counseling_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageKonselingDetailAdmin counseling_id={counseling_id} /> : <PageNotFound />;
}
