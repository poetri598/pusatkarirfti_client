"use client";
import { useAuth } from "@/context/AuthContext";
import PageAdmin from "@/components/Admin/BuatCV/PageUbahPenghargaan";
import PageUser from "@/components/User/BuatCV/PageUbahPenghargaan";

export default function Redirect({ user_name }: { user_name: string }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageAdmin user_name={user_name} /> : <PageUser user_name={user_name} />;
}
