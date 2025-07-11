import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ news_type_id: number }> }) {
  const { news_type_id } = use(params); // <- unwrap async params
  return <Edit news_type_id={news_type_id} />;
}
