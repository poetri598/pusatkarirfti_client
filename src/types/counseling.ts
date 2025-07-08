export interface CounselingItem {
  counseling_id: number;
  counseling_desc: string;
  counseling_date: string;
  counseling_is_read: boolean;
  counseling_created_at: string;
  user_id: number;

  user_img: string;
  user_fullname: string;
  user_phone: string;
  user_nim: string;
  program_study_name: string;

  counseling_type_id: number;
  counseling_type_name: string;
  status_id: number;
  status_name: string;
}
