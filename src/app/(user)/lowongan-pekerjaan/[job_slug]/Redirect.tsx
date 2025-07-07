"use client";
import { useAuth } from "@/context/AuthContext";
import PageLowonganPekerjaanDetailAdmin from "@/components/Admin/LowonganPekerjaan/PageLowonganPekerjaanDetail";
import PageLowonganPekerjaanDetailUser from "@/components/User/LowonganPekerjaan/PageLowonganPekerjaanDetail";

export default function Redirect({ job_slug }: { job_slug: string }) {
  const { user } = useAuth();

  if (user?.role_name === "Admin") {
    return <PageLowonganPekerjaanDetailAdmin job_slug={job_slug} />;
  }

  return <PageLowonganPekerjaanDetailUser job_slug={job_slug} />;
}
