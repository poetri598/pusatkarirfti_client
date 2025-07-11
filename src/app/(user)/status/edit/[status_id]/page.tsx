import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ status_id: number }> }) {
  const { status_id } = use(params); // <- unwrap async params
  return <Edit status_id={status_id} />;
}
