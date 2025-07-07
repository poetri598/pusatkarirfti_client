import { Selection } from "@heroui/react";

export function appendSingle(formData: FormData, field: string, value: Selection) {
  if (value instanceof Set && value.size > 0) {
    const val = Array.from(value)[0];
    const parsed = Number(val);
    if (!isNaN(parsed) && parsed > 0) {
      formData.append(field, String(parsed));
    }
  }
}

export function appendMultiple(formData: FormData, key: string, values: Selection) {
  if (values instanceof Set && values.size > 0) {
    const array = Array.from(values);
    formData.append(key, array.join(","));
  }
}
