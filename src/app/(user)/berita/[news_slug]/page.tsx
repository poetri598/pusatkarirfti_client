import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ news_slug: string }> }) {
  const { news_slug } = use(params); // <- unwrap async params
  return <Redirect news_slug={news_slug} />;
}
