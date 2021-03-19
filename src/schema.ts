import { Some } from "./Some";
import { None } from "./None";
import { maybeBoolean } from "./maybeBoolean";
import { maybeNumber } from "./maybeNumber";
import { maybeString } from "./maybeString";
import { maybeArrayOf } from "./maybeArrayOf";
import { maybeShape } from "./maybeShape";
import { MaybeFactory } from "./types";
import { nullable } from "./nullable";

export const boolean = maybeBoolean;
export const number = maybeNumber;
export const string = maybeString;
export const arrayOf = maybeArrayOf;
export const shape = maybeShape;

export namespace optional {
  export const boolean = nullable(maybeBoolean);
  export const number = nullable(maybeNumber);
  export const string = nullable(maybeString);

  export const arrayOf = <TValue>(factory: MaybeFactory<TValue>) =>
    nullable(maybeArrayOf(factory));
}

export namespace coercible {
  export const date: MaybeFactory<Date> = (value) => {
    if (value instanceof Date) {
      return new Some(value);
    }

    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return new Some(new Date(value));
    }

    return new None();
  };

  export const number: MaybeFactory<number> = (value) => {
    if (typeof value === "number") {
      return new Some(value);
    }

    if (typeof value === "string" && /^\d+(\.\d+)?$/.test(value)) {
      return new Some(parseFloat(value));
    }

    return new None();
  };
}
