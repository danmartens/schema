import { Some } from "./Some";
import { None } from "./None";
import { ConstantValue, MaybeFactory } from "./types";
import { validatorTypeNames } from "./validatorTypeNames";

export const maybeConstant = <TValue extends ConstantValue>(
  target: TValue
): MaybeFactory<TValue> => {
  const validator = (value: unknown) => {
    if (value === target) {
      return new Some(value as TValue);
    }

    return new None(() => `Value must be ${JSON.stringify(target)}`);
  };

  validatorTypeNames.set(validator, [JSON.stringify(target)]);

  return validator;
};
