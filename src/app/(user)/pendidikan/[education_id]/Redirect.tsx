"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/Pendidikan/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ education_id }: { education_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail education_id={education_id} /> : <PageNotFound />;
}
