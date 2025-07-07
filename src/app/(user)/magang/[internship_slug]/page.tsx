import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ internship_slug: string }> }) {
  const { internship_slug } = use(params); // <- unwrap async params
  return <Redirect internship_slug={internship_slug} />;
}
