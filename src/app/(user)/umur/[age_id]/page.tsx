import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ age_id: number }> }) {
  const { age_id } = use(params);
  return <Redirect age_id={age_id} />;
}
