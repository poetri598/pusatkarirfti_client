import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ student_room_id: string }> }) {
  const { student_room_id } = use(params); // <- unwrap async params
  return <Edit student_room_id={student_room_id} />;
}
