import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ skill_id: number }> }) {
  const { skill_id } = use(params); // <- unwrap async params
  return <Edit skill_id={skill_id} />;
}
