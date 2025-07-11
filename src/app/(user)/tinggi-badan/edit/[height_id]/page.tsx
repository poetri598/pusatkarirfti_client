import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ height_id: number }> }) {
  const { height_id } = use(params); // <- unwrap async params
  return <Edit height_id={height_id} />;
}
