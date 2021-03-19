import { Some } from "./Some";
import { None } from "./None";

export function maybeBoolean<T>(value: boolean | T): Some<boolean> | None<T> {
  if (typeof value === "boolean") {
    return new Some(value);
  } else {
    return new None<T>();
  }
}
