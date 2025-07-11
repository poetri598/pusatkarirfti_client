import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ ipk_id: number }> }) {
  const { ipk_id } = use(params); // <- unwrap async params
  return <Edit ipk_id={ipk_id} />;
}
