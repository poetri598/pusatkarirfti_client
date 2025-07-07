import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ expo_slug: string }> }) {
  const { expo_slug } = use(params); // <- unwrap async params
  return <Redirect expo_slug={expo_slug} />;
}
