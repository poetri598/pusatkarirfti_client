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

export function appendSingleImmediate(formData: FormData, field: string, value: string | number | null | undefined) {
  if (value !== null && value !== undefined && value !== "") {
    formData.append(field, String(value));
  }
}

export function appendMultiple(formData: FormData, key: string, values: Selection) {
  if (values instanceof Set && values.size > 0) {
    const array = Array.from(values);
    formData.append(key, array.join(","));
  }
}

export function appendJson(formData: FormData, key: string, data: any) {
  try {
    const jsonString = JSON.stringify(data);
    formData.append(key, jsonString);
  } catch (error) {
    console.error(`Gagal mengubah ${key} menjadi JSON`, error);
  }
}
