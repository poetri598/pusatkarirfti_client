"use client";
import { useAuth } from "@/context/AuthContext";
import PageProfilSayaUbahAdmin from "@/components/Admin/ProfilSaya/PageProfileSayaUbah";
import PageProfilSayaUbahUser from "@/components/User/ProfilSaya/PageProfileSayaUbah";

export default function Redirect({ user_name }: { user_name: string }) {
  const { user } = useAuth();

  if (user?.role_name === "Admin") {
    return <PageProfilSayaUbahAdmin user_name={user_name} />;
  }

  return <PageProfilSayaUbahUser user_name={user_name} />;
}
