import { Some } from "./Some";
import { None } from "./None";
import { Schema, SchemaType, Maybe } from "./types";

export function maybeArrayOf<
  TSchema extends Schema<{ [key: string]: any }>,
  TValue extends SchemaType<TSchema>
>(schema: (value: any) => Maybe<TValue>) {
  const cache = new WeakMap<any, Maybe<TValue[]>>();

  const cacheResult = (
    value: any,
    result: Maybe<TValue[]>
  ): Maybe<TValue[]> => {
    cache.set(value, result);

    return result;
  };

  return (value: any): Maybe<TValue[]> => {
    if (!Array.isArray(value)) {
      return new None();
    }

    if (cache.has(value)) {
      return cache.get(value)!;
    }

    for (const item of value) {
      if (schema(item) instanceof None) {
        return cacheResult(value, new None());
      }
    }

    return cacheResult(value, new Some(value as TValue[]));
  };
}
