import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ job_slug: string }> }) {
  const { job_slug } = use(params); // <- unwrap async params
  return <Redirect job_slug={job_slug} />;
}
