import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ religion_id: number }> }) {
  const { religion_id } = use(params); // <- unwrap async params
  return <Edit religion_id={religion_id} />;
}
