import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ platform_id: number }> }) {
  const { platform_id } = use(params); // <- unwrap async params
  return <Edit platform_id={platform_id} />;
}
