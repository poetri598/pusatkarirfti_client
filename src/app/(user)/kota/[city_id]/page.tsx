import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ city_id: number }> }) {
  const { city_id } = use(params);
  return <Redirect city_id={city_id} />;
}
