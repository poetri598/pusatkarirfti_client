import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ role_id: number }> }) {
  const { role_id } = use(params);
  return <Redirect role_id={role_id} />;
}
