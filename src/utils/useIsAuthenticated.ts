// utils/useIsAuthenticated.ts
import { useSession } from "@/utils/useSession";
import { isAuthenticated as check } from "@/services/auth";

export function useIsAuthenticated(): boolean {
  const user = useSession();
  return check(user);
}
