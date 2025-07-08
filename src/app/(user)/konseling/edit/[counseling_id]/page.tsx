import { use } from "react";
import Edit from "./Edit";

export default function Page({ params }: { params: Promise<{ counseling_id: string }> }) {
  const { counseling_id } = use(params);
  return <Edit counseling_id={counseling_id} />;
}
