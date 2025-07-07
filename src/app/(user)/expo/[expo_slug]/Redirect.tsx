"use client";
import { useAuth } from "@/context/AuthContext";
import PageExpoDetailAdmin from "@/components/Admin/Expo/PageExpoDetail";
import PageExpoDetailUser from "@/components/User/Expo/PageExpoDetail";

export default function Redirect({ expo_slug }: { expo_slug: string }) {
  const { user } = useAuth();

  if (user?.role_name === "Admin") {
    return <PageExpoDetailAdmin expo_slug={expo_slug} />;
  }

  return <PageExpoDetailUser expo_slug={expo_slug} />;
}
