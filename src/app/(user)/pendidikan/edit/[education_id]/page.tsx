import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ education_id: number }> }) {
  const { education_id } = use(params); // <- unwrap async params
  return <Edit education_id={education_id} />;
}
