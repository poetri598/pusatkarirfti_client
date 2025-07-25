"use client";
import { useAuth } from "@/context/AuthContext";
import PagePenggunaDetail from "@/components/Admin/Pengguna/PagePenggunaDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ user_name }: { user_name: string }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PagePenggunaDetail user_name={user_name} /> : <PageNotFound />;
}
