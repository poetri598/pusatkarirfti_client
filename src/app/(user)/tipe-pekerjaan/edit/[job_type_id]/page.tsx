import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ job_type_id: number }> }) {
  const { job_type_id } = use(params); // <- unwrap async params
  return <Edit job_type_id={job_type_id} />;
}
