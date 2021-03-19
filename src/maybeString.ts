import { Some } from "./Some";
import { None } from "./None";
import { Maybe } from "./types";

export function maybeString(value: unknown): Maybe<string> {
  if (typeof value === "string") {
    return new Some(value);
  } else {
    return new None();
  }
}
