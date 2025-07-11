import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ country_id: number }> }) {
  const { country_id } = use(params);
  return <Redirect country_id={country_id} />;
}
