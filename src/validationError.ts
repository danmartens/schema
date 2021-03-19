import { MaybeFactory } from "./types";
import { validatorTypeNames } from "./validatorTypeNames";

export const validationError = (
  validators: MaybeFactory<unknown>[],
  options?: { object?: string; key?: string }
) => {
  const typeNames = validators.flatMap((validator) =>
    validatorTypeNames.get(validator)
  );

  const expected =
    typeNames != null ? `Some<${typeNames.join(" | ")}>` : "Some";

  if (options?.object != null && options.key != null) {
    return `Expected value of "${options.object}.${options.key}" to match ${expected}`;
  }

  if (options?.key != null) {
    return `Expected value of key "${options.key}" to match ${expected}`;
  }

  return `Expected value to match ${expected}`;
};
