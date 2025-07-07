import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ news_slug: string }> }) {
  const { news_slug } = use(params); // <- unwrap async params
  return <Edit news_slug={news_slug} />;
}
