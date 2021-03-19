import { Some } from "./Some";
import { None } from "./None";
import { MaybeFactory } from "./types";

export const maybeArrayOf = <TValue>(
  maybeValue: MaybeFactory<TValue>
): MaybeFactory<TValue[]> => (value) => {
  if (!Array.isArray(value)) {
    return new None();
  }

  const transformed: TValue[] = [];

  for (const item of value) {
    const maybeItem = maybeValue(item);

    if (maybeItem instanceof None) {
      return new None();
    }

    transformed.push(maybeItem.valueOf());
  }

  return new Some(transformed);
};
