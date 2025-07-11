import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ training_type_id: number }> }) {
  const { training_type_id } = use(params); // <- unwrap async params
  return <Edit training_type_id={training_type_id} />;
}
