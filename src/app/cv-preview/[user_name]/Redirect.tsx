"use client";
import { useAuth } from "@/context/AuthContext";
import PageAdmin from "@/components/Admin/BuatCV/PageCVPreview";
import PageUser from "@/components/User/BuatCV/PageCVPreview";

export default function Redirect({ user_name }: { user_name: string }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageAdmin user_name={user_name} /> : <PageUser user_name={user_name} />;
}
