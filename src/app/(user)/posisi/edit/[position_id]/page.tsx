import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ position_id: number }> }) {
  const { position_id } = use(params); // <- unwrap async params
  return <Edit position_id={position_id} />;
}
