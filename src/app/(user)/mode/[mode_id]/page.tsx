import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ mode_id: number }> }) {
  const { mode_id } = use(params);
  return <Redirect mode_id={mode_id} />;
}
