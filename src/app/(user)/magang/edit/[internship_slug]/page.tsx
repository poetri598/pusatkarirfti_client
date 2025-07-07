import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ internship_slug: string }> }) {
  const { internship_slug } = use(params); // <- unwrap async params
  return <Edit internship_slug={internship_slug} />;
}
