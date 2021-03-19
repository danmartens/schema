import { Some } from "./Some";
import { None } from "./None";
import { Maybe } from "./types";

// export function maybeArray<V, T>(
//   value: Array<V> | T
// ): Some<Array<V>> | None<T> {
//   if (Array.isArray(value)) {
//     return new Some(value);
//   } else {
//     return new None<T>();
//   }
// }
// export function maybeObject<T>(value: T | null | undefined): Maybe<T> {
//   if (value != null && typeof value === "object") {
//     return new Some(value);
//   } else {
//     return new None<T>();
//   }
// }
const isPresent = (value: any): boolean => {
  if (value == null) {
    return false;
  }

  if (typeof value === "string") {
    return /[^\s]+/.test(value);
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value === "object") {
    return Object.keys(value).length > 0;
  }

  return true;
};

export function maybePresent<T>(value: T): Maybe<T> {
  if (isPresent(value)) {
    return new Some(value);
  } else {
    return new None<T>();
  }
}
