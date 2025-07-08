import { use } from "react";
import Redirect from "./Redirect";

export default function Page({ params }: { params: Promise<{ counseling_id: number }> }) {
  const { counseling_id } = use(params);
  return <Redirect counseling_id={counseling_id} />;
}
