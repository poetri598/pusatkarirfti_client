import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ mode_id: number }> }) {
  const { mode_id } = use(params); // <- unwrap async params
  return <Edit mode_id={mode_id} />;
}
