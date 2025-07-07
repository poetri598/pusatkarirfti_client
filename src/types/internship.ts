export interface InternshipItem {
  internship_id: number;
  internship_name: string;
  internship_slug: string;

  internship_img: string;
  internship_desc: string;
  internship_views: number;

  internship_location: string;
  internship_link: string;

  internship_start_date: string;
  internship_end_date: string;
  internship_open_date: string;
  internship_close_date: string;

  internship_created_at: string;

  internship_type_id: number;
  internship_type_name: string;

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

  city_ids: string[];
  country_ids: string[];
  education_ids: string[];
  gender_ids: string[];
  mode_ids: string[];
  position_ids: string[];
  program_study_ids: string[];
  province_ids: string[];
  religion_ids: string[];
  semester_ids: string[];

  city_names: string;
  country_names: string;
  education_names: string;
  gender_names: string;
  mode_names: string;
  position_names: string;
  program_study_names: string;
  province_names: string;
  religion_names: string;
  semester_nos: string;
}
