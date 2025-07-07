"use client";
import { useAuth } from "@/context/AuthContext";
import PageBeritaDetailAdmin from "@/components/Admin/Berita/PageBeritaDetail";
import PageBeritaDetailUser from "@/components/User/Berita/PageBeritaDetail";

export default function Redirect({ news_slug }: { news_slug: string }) {
  const { user } = useAuth();

  if (user?.role_name === "Admin") {
    return <PageBeritaDetailAdmin news_slug={news_slug} />;
  }

  return <PageBeritaDetailUser news_slug={news_slug} />;
}
