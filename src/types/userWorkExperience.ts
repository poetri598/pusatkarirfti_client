export interface UserWorkExperienceDescription {
  user_work_experience_description_id: number;
  user_work_experience_description_name: string;
  user_work_experience_description_created_at: string;
  user_work_experience_description_updated_at: string;
  user_work_experience_id: number;
}

export interface UserWorkExperienceItem {
  user_work_experience_id: number;
  user_work_experience_start_date: string;
  user_work_experience_end_date: string | null;
  user_work_experience_is_current: boolean;
  user_work_experience_created_at: string;
  user_work_experience_updated_at: string;
  user_id: number;
  company_id: number;
  position_id: number;
  user_work_experience_descriptions: string | UserWorkExperienceDescription[];
  company_name?: string;
  position_name?: string;
}
