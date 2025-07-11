import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ position_id: number }> }) {
  const { position_id } = use(params);
  return <Redirect position_id={position_id} />;
}
