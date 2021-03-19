import { Some } from "./Some";
import { MaybeFactory } from "./types";

export const nullable = <TValue>(
  maybeValue: MaybeFactory<TValue>
): MaybeFactory<TValue | null> => (value) => {
  if (value == null) {
    return new Some(null);
  }

  return maybeValue(value);
};
