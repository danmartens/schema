import { Some } from "./Some";
import { None } from "./None";

export function maybeString<T>(value: string | T): Some<string> | None<T> {
  if (typeof value === "string") {
    return new Some(value);
  } else {
    return new None<T>();
  }
}
