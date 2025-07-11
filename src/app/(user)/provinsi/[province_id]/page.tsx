import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ province_id: number }> }) {
  const { province_id } = use(params);
  return <Redirect province_id={province_id} />;
}
