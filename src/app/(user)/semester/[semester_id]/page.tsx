import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ semester_id: number }> }) {
  const { semester_id } = use(params);
  return <Redirect semester_id={semester_id} />;
}
