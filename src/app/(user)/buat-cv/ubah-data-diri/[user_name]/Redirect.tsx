"use client";
import { useAuth } from "@/context/AuthContext";
import PageAdmin from "@/components/Admin/BuatCV/PageUbahDataDiri";
import PageUser from "@/components/User/BuatCV/PageUbahDataDiri";

export default function Redirect({ user_name }: { user_name: string }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageAdmin user_name={user_name} /> : <PageUser user_name={user_name} />;
}
