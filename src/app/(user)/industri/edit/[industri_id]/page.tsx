import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ industry_id: number }> }) {
  const { industry_id } = use(params); // <- unwrap async params
  return <Edit industry_id={industry_id} />;
}
