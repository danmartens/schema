import { Maybe } from "./types";

function validate<TValue>(
  validator: (value: any) => Maybe<TValue>,
  value: any
): TValue {
  const result = validator(value);

  return result.orThrow();
}
