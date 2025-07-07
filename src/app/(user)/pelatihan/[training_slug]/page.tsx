import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ training_slug: string }> }) {
  const { training_slug } = use(params); // <- unwrap async params
  return <Redirect training_slug={training_slug} />;
}
