"use client";
import { useAuth } from "@/context/AuthContext";
import PageLowonganPekerjaanDetailAdmin from "@/components/Admin/LowonganPekerjaan/PageLowonganPekerjaanDetail";
import PageLowonganPekerjaanDetailUser from "@/components/User/LowonganPekerjaan/PageLowonganPekerjaanDetail";

export default function Redirect({ job_slug }: { job_slug: string }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageLowonganPekerjaanDetailAdmin job_slug={job_slug} /> : <PageLowonganPekerjaanDetailUser job_slug={job_slug} />;
}
