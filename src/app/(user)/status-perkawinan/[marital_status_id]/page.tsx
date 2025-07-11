import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ marital_status_id: number }> }) {
  const { marital_status_id } = use(params);
  return <Redirect marital_status_id={marital_status_id} />;
}
