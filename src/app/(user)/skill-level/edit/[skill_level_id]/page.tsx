import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ skill_level_id: number }> }) {
  const { skill_level_id } = use(params); // <- unwrap async params
  return <Edit skill_level_id={skill_level_id} />;
}
