"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/TipeBerita/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ news_type_id }: { news_type_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail news_type_id={news_type_id} /> : <PageNotFound />;
}
