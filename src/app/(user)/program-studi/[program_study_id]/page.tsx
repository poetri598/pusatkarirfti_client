import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ program_study_id: number }> }) {
  const { program_study_id } = use(params);
  return <Redirect program_study_id={program_study_id} />;
}
