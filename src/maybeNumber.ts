import { Some } from "./Some";
import { None } from "./None";

export function maybeNumber<T>(value: number | T): Some<number> | None<T> {
  if (typeof value === "number") {
    return new Some(value);
  } else {
    return new None<T>();
  }
}
