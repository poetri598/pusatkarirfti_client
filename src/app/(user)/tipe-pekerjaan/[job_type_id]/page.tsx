import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ job_type_id: number }> }) {
  const { job_type_id } = use(params);
  return <Redirect job_type_id={job_type_id} />;
}
