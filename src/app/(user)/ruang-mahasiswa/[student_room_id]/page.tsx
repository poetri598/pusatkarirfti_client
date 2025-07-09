import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ student_room_id: number }> }) {
  const { student_room_id } = use(params); // <- unwrap async params
  return <Redirect student_room_id={student_room_id} />;
}
