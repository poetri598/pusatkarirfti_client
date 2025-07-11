import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ news_type_id: number }> }) {
  const { news_type_id } = use(params);
  return <Redirect news_type_id={news_type_id} />;
}
