import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ internship_type_id: number }> }) {
  const { internship_type_id } = use(params); // <- unwrap async params
  return <Edit internship_type_id={internship_type_id} />;
}
