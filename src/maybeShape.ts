import { Some } from "./Some";
import { None } from "./None";
import { Schema, SchemaType, Maybe } from "./types";

export function maybeShape<
  TSchema extends Schema<{ [key: string]: any }>,
  TValue extends SchemaType<TSchema>
>(schema: TSchema) {
  const cache = new WeakMap<any, Maybe<TValue>>();

  const cacheResult = (value: any, result: Maybe<TValue>): Maybe<TValue> => {
    cache.set(value, result);

    return result;
  };

  return (value: any): Maybe<TValue> => {
    if (value == null || typeof value !== "object") {
      return new None<SchemaType<TSchema>>();
    }

    if (cache.has(value)) {
      return new Some(value);
    }

    const entries: [string, Some<unknown>][] = [];

    for (const key of Object.keys(schema)) {
      const maybeValue = schema[key];
      const result = maybeValue(value[key]);

      if (result instanceof None) {
        return new None<TValue>();
      }

      entries.push([key, result]);
    }

    return cacheResult(value, new Some(Object.fromEntries(entries) as TValue));
  };
}
