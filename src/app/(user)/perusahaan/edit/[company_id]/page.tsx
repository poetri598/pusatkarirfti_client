import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ company_id: number }> }) {
  const { company_id } = use(params); // <- unwrap async params
  return <Edit company_id={company_id} />;
}
