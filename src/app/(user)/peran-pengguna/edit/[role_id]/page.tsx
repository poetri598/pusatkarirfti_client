import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ role_id: number }> }) {
  const { role_id } = use(params); // <- unwrap async params
  return <Edit role_id={role_id} />;
}
