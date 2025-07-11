import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ province_id: number }> }) {
  const { province_id } = use(params); // <- unwrap async params
  return <Edit province_id={province_id} />;
}
