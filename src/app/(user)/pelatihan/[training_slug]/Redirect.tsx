"use client";
import { useAuth } from "@/context/AuthContext";
import PagePelatihanDetailAdmin from "@/components/Admin/Pelatihan/PagePelatihanDetail";
import PagePelatihanDetailUser from "@/components/User/Pelatihan/PagePelatihanDetail";

export default function Redirect({ training_slug }: { training_slug: string }) {
  const { user } = useAuth();

  if (user?.role_name === "Admin") {
    return <PagePelatihanDetailAdmin training_slug={training_slug} />;
  }

  return <PagePelatihanDetailUser training_slug={training_slug} />;
}
