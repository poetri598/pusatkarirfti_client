import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ country_id: number }> }) {
  const { country_id } = use(params); // <- unwrap async params
  return <Edit country_id={country_id} />;
}
