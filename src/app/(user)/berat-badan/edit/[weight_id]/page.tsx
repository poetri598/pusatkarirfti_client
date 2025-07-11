import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ weight_id: number }> }) {
  const { weight_id } = use(params); // <- unwrap async params
  return <Edit weight_id={weight_id} />;
}
