import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ profil_cdc_fti_id: number }> }) {
  const { profil_cdc_fti_id } = use(params); // <- unwrap async params
  return <Redirect profil_cdc_fti_id={profil_cdc_fti_id} />;
}
