import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ program_study_id: number }> }) {
  const { program_study_id } = use(params); // <- unwrap async params
  return <Edit program_study_id={program_study_id} />;
}
