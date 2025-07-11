import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ religion_id: number }> }) {
  const { religion_id } = use(params);
  return <Redirect religion_id={religion_id} />;
}
