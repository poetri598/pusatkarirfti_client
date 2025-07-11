import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ marital_status_id: number }> }) {
  const { marital_status_id } = use(params); // <- unwrap async params
  return <Edit marital_status_id={marital_status_id} />;
}
