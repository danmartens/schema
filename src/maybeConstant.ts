import { Some } from "./Some";
import { None } from "./None";
import { MaybeFactory } from "./types";

export const maybeConstant = <TValue extends string | number>(
  target: TValue
): MaybeFactory<TValue> => {
  return (value) => {
    if (value === target) {
      return new Some(value as TValue);
    }

    return new None();
  };
};
