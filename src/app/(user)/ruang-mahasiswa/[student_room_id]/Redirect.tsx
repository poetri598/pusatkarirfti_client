"use client";
import { useAuth } from "@/context/AuthContext";
import PageRuangMahasiswaDetailAdmin from "@/components/Admin/RuangMahasiswa/PageRuangMahasiswaDetail";
import PageNotFound from "@/components/Custom/PageNotFound";

export default function Redirect({ student_room_id }: { student_room_id: number }) {
  const { user } = useAuth();

  return user?.role_name === "Admin" ? <PageRuangMahasiswaDetailAdmin student_room_id={student_room_id} /> : <PageNotFound />;
}
