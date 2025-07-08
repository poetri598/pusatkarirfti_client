import { use } from "react";
import Redirect from "./Redirect";

export default function page({ params }: { params: Promise<{ user_name: string }> }) {
  const { user_name } = use(params); // <- unwrap async params
  return <Redirect user_name={user_name} />;
}
