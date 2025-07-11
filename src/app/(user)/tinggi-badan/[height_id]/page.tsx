import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ height_id: number }> }) {
  const { height_id } = use(params);
  return <Redirect height_id={height_id} />;
}
