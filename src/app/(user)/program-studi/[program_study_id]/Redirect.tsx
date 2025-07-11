"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/ProgramStudi/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ program_study_id }: { program_study_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail program_study_id={program_study_id} /> : <PageNotFound />;
}
