import { Some } from "./Some";
import { None } from "./None";
import { Maybe } from "./types";

export function maybeNumber(value: unknown): Maybe<number> {
  if (typeof value === "number") {
    return new Some(value);
  } else {
    return new None();
  }
}
