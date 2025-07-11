import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ gender_id: number }> }) {
  const { gender_id } = use(params);
  return <Redirect gender_id={gender_id} />;
}
