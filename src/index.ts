import * as schema from "./schema";

schema.coercible.number("20").orThrow();

import { Maybe } from "./types";

function validate<TValue>(
  validator: (value: any) => Maybe<TValue>,
  value: any
): TValue {
  const result = validator(value);

  return result.orThrow();
}
