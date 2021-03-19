import { Some } from "./Some";
import { None } from "./None";
import { MaybeFactory } from "./types";

export const maybeBoolean: MaybeFactory<boolean> = (value) => {
  if (typeof value === "boolean") {
    return new Some(value);
  } else {
    return new None();
  }
};
