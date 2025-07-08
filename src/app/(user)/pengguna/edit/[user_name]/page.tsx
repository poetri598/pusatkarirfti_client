import { use } from "react";
import Edit from "./Edit";

export default function page({ params }: { params: Promise<{ user_name: string }> }) {
  const { user_name } = use(params); // <- unwrap async params
  return <Edit user_name={user_name} />;
}
