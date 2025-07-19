export interface UserEducationItem {
  user_education_id: number;
  user_education_name: string;
  user_education_subject: string;
  user_education_admission_date: string;
  user_education_graduation_date: string | null;
  user_education_is_current: boolean;
  user_education_final_score: number;
  user_education_created_at: string;
  user_education_updated_at: string;
  user_id: number;
  education_id: number;

  education_name?: string;
}
