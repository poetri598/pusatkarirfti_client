import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ weight_id: number }> }) {
  const { weight_id } = use(params);
  return <Redirect weight_id={weight_id} />;
}
