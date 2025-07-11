"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/TipePekerjaan/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ job_type_id }: { job_type_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail job_type_id={job_type_id} /> : <PageNotFound />;
}
