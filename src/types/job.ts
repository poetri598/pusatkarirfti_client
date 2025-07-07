export interface JobItem {
  job_id: number;
  job_name: string;
  job_slug: string;

  job_img: string;
  job_desc: string;
  job_views: number;

  job_salary_min: string;
  job_salary_max: string;

  job_location: string;
  job_link: string;

  job_open_date: string;
  job_close_date: string;
  job_created_at: string;

  age_min_id: number;
  age_min_no: number;
  age_max_id: number;
  age_max_no: number;

  weight_min_id: number;
  weight_min_no: number;
  weight_max_id: number;
  weight_max_no: number;

  height_min_id: number;
  height_min_no: number;
  height_max_id: number;
  height_max_no: number;

  job_type_id: number;
  job_type_name: string;

  company_id: number;
  company_name: string;
  company_img: string;

  user_id: number;
  user_img: string;
  user_fullname: string;
  role_name: string;

  ipk_id: number;
  ipk_no: string;

  status_id: number;
  status_name: string;

  city_ids: number[];
  city_names: string;
  country_ids: number[];
  country_names: string;
  education_ids: number[];
  education_names: string;
  experience_ids: number[];
  experience_names: string;
  gender_ids: number[];
  gender_names: string;
  marital_status_ids: number[];
  marital_status_names: string;
  mode_ids: number[];
  mode_names: string;
  position_ids: number[];
  position_names: string;
  program_study_ids: number[];
  program_study_names: string;
  province_ids: number[];
  province_names: string;
  religion_ids: number[];
  religion_names: string;
}

export interface CreateJobPayload {
  job_name: string;
  job_slug?: string; // Optional, karena bisa digenerate dari backend jika perlu
  job_img?: string | null; // Base64 string atau null
  job_desc: string;
  job_salary_min: number;
  job_salary_max: number;
  job_height_min: number;
  job_height_max: number;
  job_weight_min: number;
  job_weight_max: number;
  job_location: string;
  job_link: string;
  job_open_date: string; // Format: "YYYY-MM-DD"
  job_close_date: string; // Format: "YYYY-MM-DD"
  job_type_id: number;
  company_id: number;
  user_id: number;
  ipk_id: number;

  // Pivot many-to-many (optional, bisa kosong atau tidak dikirim)
  city_ids?: string[];
  country_ids?: string[];
  education_ids?: string[];
  experience_ids?: string[];
  gender_ids?: string[];
  marital_status_ids?: string[];
  mode_ids?: string[];
  position_ids?: string[];
  program_study_ids?: string[];
  province_ids?: string[];
  religion_ids?: string[];
}
