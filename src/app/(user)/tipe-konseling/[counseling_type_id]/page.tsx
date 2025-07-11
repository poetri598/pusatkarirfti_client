import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ counseling_type_id: number }> }) {
  const { counseling_type_id } = use(params);
  return <Redirect counseling_type_id={counseling_type_id} />;
}
