import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ expo_type_id: number }> }) {
  const { expo_type_id } = use(params); // <- unwrap async params
  return <Edit expo_type_id={expo_type_id} />;
}
