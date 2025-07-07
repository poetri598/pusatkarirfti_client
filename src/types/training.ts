export interface TrainingItem {
  training_id: number;
  training_name: string;
  training_slug: string;

  training_img: string;
  training_desc: string;
  training_price: number;
  training_views: number;

  training_location: string;
  training_link: string;
  training_date: string;
  training_open_date: string;
  training_close_date: string;
  training_created_at: string;

  company_id: number;
  company_name: string;
  company_img: string;

  status_id: number;
  status_name: string;

  user_id: number;
  user_img: string;
  user_fullname: string;
  role_name: string;

  city_ids: string[];
  country_ids: string[];
  education_ids: string[];
  mode_ids: string[];
  program_study_ids: string[];
  province_ids: string[];
  semester_ids: string[];
  skill_ids: string[];
  training_type_ids: string[];
  city_names: string;
  country_names: string;
  education_names: string;
  mode_names: string;
  program_study_names: string;
  province_names: string;
  semester_nos: string;
  skill_names: string;
  training_type_names: string;
}
