import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ company_id: number }> }) {
  const { company_id } = use(params); // <- unwrap async params
  return <Redirect company_id={company_id} />;
}
