import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ platform_id: number }> }) {
  const { platform_id } = use(params); // <- unwrap async params
  return <Redirect platform_id={platform_id} />;
}
