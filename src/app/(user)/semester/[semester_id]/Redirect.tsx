"use client";
import { useAuth } from "@/context/AuthContext";
import PageDetail from "@/components/Admin/Semester/PageDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ semester_id }: { semester_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageDetail semester_id={semester_id} /> : <PageNotFound />;
}
