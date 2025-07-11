import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ expo_type_id: number }> }) {
  const { expo_type_id } = use(params);
  return <Redirect expo_type_id={expo_type_id} />;
}
