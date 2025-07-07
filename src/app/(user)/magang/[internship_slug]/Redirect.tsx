"use client";
import { useAuth } from "@/context/AuthContext";
import PageMagangDetailAdmin from "@/components/Admin/Magang/PageMagangDetail";
import PageMagangDetailUser from "@/components/User/Magang/PageMagangDetail";

export default function Redirect({ internship_slug }: { internship_slug: string }) {
  const { user } = useAuth();

  if (user?.role_name === "Admin") {
    return <PageMagangDetailAdmin internship_slug={internship_slug} />;
  }

  return <PageMagangDetailUser internship_slug={internship_slug} />;
}
