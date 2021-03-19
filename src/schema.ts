import { Some } from "./Some";
import { None } from "./None";
import { maybeBoolean } from "./maybeBoolean";
import { maybeNumber } from "./maybeNumber";
import { maybeString } from "./maybeString";
import { maybeArrayOf } from "./maybeArrayOf";
import { maybeShape } from "./maybeShape";
import { Maybe } from "./types";

export const boolean = maybeBoolean;
export const number = maybeNumber;
export const string = maybeString;

export const arrayOf = maybeArrayOf;
export const shape = maybeShape;

export namespace coercible {
  export function date(value: unknown): Maybe<Date> {
    if (value instanceof Date) {
      return new Some(value);
    }

    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return new Some(new Date(value));
    }

    return new None();
  }

  export function number(value: unknown): Maybe<number> {
    if (typeof value === "number") {
      return new Some(value);
    }

    if (typeof value === "string" && /^\d+(\.\d+)?$/.test(value)) {
      return new Some(parseFloat(value));
    }

    return new None();
  }
}

export function optional<TValue, TResult>(
  maybeValue: (value: TValue) => TResult
) {
  return (value: TValue | null | undefined): TResult | Some<null> => {
    if (value == null) {
      return new Some(null);
    }

    return maybeValue(value);
  };
}

export const optionalNumber = optional(number);
export const optionalCoercibleNumber = optional(coercible.number);

export const optionalBoolean = optional(boolean);

export const optionalString = optional(string);
