import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ age_id: number }> }) {
  const { age_id } = use(params); // <- unwrap async params
  return <Edit age_id={age_id} />;
}
