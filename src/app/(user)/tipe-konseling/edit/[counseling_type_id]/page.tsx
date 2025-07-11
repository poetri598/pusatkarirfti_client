import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ counseling_type_id: number }> }) {
  const { counseling_type_id } = use(params); // <- unwrap async params
  return <Edit counseling_type_id={counseling_type_id} />;
}
