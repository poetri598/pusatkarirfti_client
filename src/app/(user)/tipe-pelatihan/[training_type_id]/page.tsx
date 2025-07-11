import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ training_type_id: number }> }) {
  const { training_type_id } = use(params);
  return <Redirect training_type_id={training_type_id} />;
}
