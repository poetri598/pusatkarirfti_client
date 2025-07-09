export interface StudentRoomItem {
  student_room_id: number;
  student_room_name: string;
  student_room_img: string;
  student_room_desc: string;

  student_room_created_at: string;
  student_room_updated_at: string;

  user_id: number;
  user_img: string;
  user_fullname: string;

  current_position_id: number;
  current_position_name: string;

  current_company_id: number;
  current_company_name: string;

  status_id: number;
  status_name: string;
}
