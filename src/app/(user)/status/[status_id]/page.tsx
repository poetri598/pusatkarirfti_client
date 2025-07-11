import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ status_id: number }> }) {
  const { status_id } = use(params);
  return <Redirect status_id={status_id} />;
}
