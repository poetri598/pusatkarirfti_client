import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ city_id: number }> }) {
  const { city_id } = use(params); // <- unwrap async params
  return <Edit city_id={city_id} />;
}
