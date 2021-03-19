import { Some } from "./Some";
import { None } from "./None";
import { Schema, SchemaType, Maybe } from "./types";

export const maybeShape = <
  TSchema extends Schema<{ [key: string]: any }>,
  TValue extends SchemaType<TSchema>
>(
  schema: TSchema
) => (value: any): Maybe<TValue> => {
  if (value == null || typeof value !== "object") {
    return new None();
  }

  const entries: [string, Some<unknown>][] = [];

  for (const key of Object.keys(schema)) {
    const maybeValue = schema[key];
    const result = maybeValue(value[key]);

    if (result instanceof None) {
      return new None();
    }

    entries.push([key, result]);
  }

  return new Some(Object.fromEntries(entries) as TValue);
};
