import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ skill_id: number }> }) {
  const { skill_id } = use(params);
  return <Redirect skill_id={skill_id} />;
}
