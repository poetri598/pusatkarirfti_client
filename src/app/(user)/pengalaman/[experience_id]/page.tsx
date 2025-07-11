import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ experience_id: number }> }) {
  const { experience_id } = use(params);
  return <Redirect experience_id={experience_id} />;
}
