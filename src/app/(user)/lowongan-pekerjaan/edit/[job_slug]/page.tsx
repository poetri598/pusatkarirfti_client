import { use } from "react";
import Edit from "./Edit";

export default function Page({ params }: { params: Promise<{ job_slug: string }> }) {
  const { job_slug } = use(params);
  return <Edit job_slug={job_slug} />;
}
