import { useEffect, useState } from "react";
import { UserItem } from "@/types/user";

const emptyUser: UserItem = {
  user_id: 0,
  user_img: "/",
  user_fullname: "",
  user_name: "",
  user_nim: "",
  user_phone: "",
  user_email: "",
  user_password: "",
  user_password_confirm: "",
  user_birthdate: "",
  user_admission_date: "",
  user_graduation_date: "",
  role_id: 0,
  status_id: 0,
  program_study_id: 0,
  education_id: 0,
  gender_id: 0,
  city_id: 0,
  dream_position_id: 0,
  religion_id: 0,
  ipk_id: 0,
  dream_company_id: 0,
  is_employed: false,
  current_company_id: 0,
  current_position_id: 0,

  // JOINED VALUES (deskriptif)
  role_name: "",
  status_name: "",
  program_study_name: "",
  education_name: "",
  gender_name: "",
  city_name: "",
  dream_position_name: "",
  current_position_name: "",
  religion_name: "",
  ipk_no: "",
  dream_company_name: "",
  dream_company_img: "",
  current_company_name: "",
  current_company_img: "",
};

export function useSession(): UserItem {
  const [user, setUser] = useState<UserItem>(emptyUser);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = localStorage.getItem("user");
      if (!raw) return;

      const parsed: unknown = JSON.parse(raw);

      const allowedRoles = ["Admin", "Mahasiswa", "Alumni", "Perusahaan"];
      if (parsed && typeof parsed === "object" && (parsed as any).role_name && allowedRoles.includes((parsed as any).role_name)) {
        setUser(parsed as UserItem);
      }
    } catch (err) {
      console.error("Gagal parsing user dari localStorage:", err);
      setUser(emptyUser);
    }
  }, []);

  return user;
}
