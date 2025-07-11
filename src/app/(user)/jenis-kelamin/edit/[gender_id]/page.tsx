import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ gender_id: number }> }) {
  const { gender_id } = use(params); // <- unwrap async params
  return <Edit gender_id={gender_id} />;
}
