import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ internship_type_id: number }> }) {
  const { internship_type_id } = use(params);
  return <Redirect internship_type_id={internship_type_id} />;
}
