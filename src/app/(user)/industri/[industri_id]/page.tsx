import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ industry_id: number }> }) {
  const { industry_id } = use(params);
  return <Redirect industry_id={industry_id} />;
}
