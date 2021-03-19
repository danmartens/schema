import { Some } from "./Some";
import { None } from "./None";
import { Maybe } from "./types";

export function maybeBoolean<T>(value: boolean | T): Maybe<boolean> {
  if (typeof value === "boolean") {
    return new Some(value);
  } else {
    return new None();
  }
}
