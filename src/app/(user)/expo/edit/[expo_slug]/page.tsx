import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ expo_slug: string }> }) {
  const { expo_slug } = use(params); // <- unwrap async params
  return <Edit expo_slug={expo_slug} />;
}
