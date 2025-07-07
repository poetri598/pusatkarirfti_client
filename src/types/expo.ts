export interface ExpoItem {
  expo_id: number;
  expo_name: string;
  expo_slug: string;

  expo_img: string;
  expo_desc: string;
  expo_price: number;
  expo_views: number;

  expo_location: string;
  expo_link: string;
  expo_date: string;
  expo_open_date: string;
  expo_close_date: string;
  expo_created_at: string;

  user_id: number;
  user_img: string;
  user_fullname: string;
  role_name: string;

  status_id: number;
  status_name: string;

  city_ids: number[];
  company_ids: number[];
  country_ids: number[];
  education_ids: number[];
  mode_ids: number[];
  position_ids: number[];
  program_study_ids: number[];
  province_ids: number[];
  expo_type_ids: number[];

  company_imgs: string[];

  city_names: string;
  company_names: string;
  country_names: string;
  education_names: string;
  mode_names: string;
  position_names: string;
  program_study_names: string;
  province_names: string;
  expo_type_names: string;
}
