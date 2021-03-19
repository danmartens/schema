import { Some } from "./Some";
import { None } from "./None";
import { Maybe, Schema, SchemaType } from "./types";
import { maybeBoolean } from "./maybeBoolean";
import { maybeNumber } from "./maybeNumber";
import { maybeString } from "./maybeString";

export namespace schema {
  export const boolean = maybeBoolean;
  export const number = maybeNumber;
  export const string = maybeString;

  export function optionalBoolean<T>(
    value: boolean | null | T
  ): Some<boolean | null> | None<T> {
    if (value === null || typeof value === "boolean") {
      return new Some(value as null | boolean);
    } else {
      return new None<T>();
    }
  }

  export function optionalNumber<T>(
    value: number | null | T
  ): Some<number | null> | None<T> {
    if (value === null || typeof value === "number") {
      return new Some(value as null | number);
    } else {
      return new None<T>();
    }
  }

  export function optionalString<T>(
    value: string | null | T
  ): Some<string | null> | None<T> {
    if (value === null || typeof value === "string") {
      return new Some(value as null | string);
    } else {
      return new None<T>();
    }
  }

  export const arrayOf = maybeArrayOf;
  export const shape = maybeShape;

  export function coercibleDate<T>(
    value: Date | string | T
  ): Some<Date> | None<T> {
    if (value instanceof Date) {
      return new Some(value);
    }

    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return new Some(new Date(value));
    }

    return new None<T>();
  }

  export function coercibleNumber<T>(
    value: number | string | T
  ): Some<number> | None<T> {
    if (typeof value === "number") {
      return new Some(value);
    }

    if (typeof value === "string" && /^\d+(\.\d+)?$/.test(value)) {
      return new Some(parseFloat(value));
    }

    return new None<T>();
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
}

function validate<TValue>(
  validator: (value: any) => Maybe<TValue>,
  value: any
): TValue {
  const result = validator(value);

  return result.orThrow();
}

export function compact<T>(values: Maybe<T>[]): Some<T>[] {
  return values.filter((value) => {
    return value instanceof Some;
  }) as Some<T>[];
}
