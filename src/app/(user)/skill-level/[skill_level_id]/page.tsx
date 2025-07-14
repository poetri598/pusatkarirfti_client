import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ skill_level_id: number }> }) {
  const { skill_level_id } = use(params);
  return <Redirect skill_level_id={skill_level_id} />;
}
