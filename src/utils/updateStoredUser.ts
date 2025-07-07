import type { UserItem } from "@/types/user";
import { getStorage } from "./storage";

/**
 * Update stored user data using the correct storage source (local/session).
 */
export function updateStoredUser(partial: Partial<UserItem>): void {
  const storage = getStorage();
  if (!storage) return;

  const userJson = storage.getItem("user");
  if (!userJson) return;

  const updatedUser = {
    ...(JSON.parse(userJson) as UserItem),
    ...partial,
  };

  storage.setItem("user", JSON.stringify(updatedUser));
}
