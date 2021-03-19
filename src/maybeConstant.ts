import { Some } from "./Some";
import { None } from "./None";
import { ConstantValue, MaybeFactory } from "./types";

export const maybeConstant = <TValue extends ConstantValue>(
  target: TValue
): MaybeFactory<TValue> => {
  return (value) => {
    if (value === target) {
      return new Some(value as TValue);
    }

    return new None();
  };
};
