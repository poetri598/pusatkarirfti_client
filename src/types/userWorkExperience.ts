export interface UserWorkExperienceItem {
  user_work_experience_id: number;
  user_id: number;
  user_fullname: string;
  company_id: number;
  company_name: string;
  position_id: number;
  position_name: string;
  user_work_experience_start_date: string;
  user_work_experience_end_date: string;
  user_work_experience_is_current: boolean;
  descriptions: string[];
}
