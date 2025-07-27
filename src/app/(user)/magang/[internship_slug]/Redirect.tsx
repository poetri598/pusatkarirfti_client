"use client";
import { useAuth } from "@/context/AuthContext";
import PageMagangDetailAdmin from "@/components/Admin/Magang/PageMagangDetail";
import PageMagangDetailUser from "@/components/User/Magang/PageMagangDetail";

export default function Redirect({ internship_slug }: { internship_slug: string }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageMagangDetailAdmin internship_slug={internship_slug} /> : <PageMagangDetailUser internship_slug={internship_slug} />;
}
