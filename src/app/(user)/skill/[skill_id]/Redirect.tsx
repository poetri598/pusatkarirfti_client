"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/Skill/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ skill_id }: { skill_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail skill_id={skill_id} /> : <PageNotFound />;
}
