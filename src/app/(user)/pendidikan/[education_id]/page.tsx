import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ education_id: number }> }) {
  const { education_id } = use(params);
  return <Redirect education_id={education_id} />;
}
