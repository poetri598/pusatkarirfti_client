import { Selection } from "@heroui/react";

export function setSelectionIfReady<T>(isLoading: boolean, userValue: T | undefined | null, setter: React.Dispatch<React.SetStateAction<Selection>>) {
  if (isLoading) return;

  const value =
    userValue === undefined || userValue === null
      ? new Set([]) // kosongkan
      : new Set([String(userValue)]); // isi sesuai ID

  setter(value);
}
