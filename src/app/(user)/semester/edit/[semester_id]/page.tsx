import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ semester_id: number }> }) {
  const { semester_id } = use(params); // <- unwrap async params
  return <Edit semester_id={semester_id} />;
}
