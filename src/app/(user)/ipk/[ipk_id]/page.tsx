import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ ipk_id: number }> }) {
  const { ipk_id } = use(params);
  return <Redirect ipk_id={ipk_id} />;
}
