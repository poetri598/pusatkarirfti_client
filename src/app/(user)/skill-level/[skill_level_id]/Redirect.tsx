"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/SkillLevel/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ skill_level_id }: { skill_level_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail skill_level_id={skill_level_id} /> : <PageNotFound />;
}
