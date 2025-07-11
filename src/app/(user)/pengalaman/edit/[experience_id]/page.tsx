import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ experience_id: number }> }) {
  const { experience_id } = use(params); // <- unwrap async params
  return <Edit experience_id={experience_id} />;
}
