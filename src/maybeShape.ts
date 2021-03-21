import { Some } from './Some';
import { None } from './None';
import { Schema, SchemaType, Maybe } from './types';
import { validationError } from './validationError';
import { validatorTypeNames } from './validatorTypeNames';

export interface Options {
  name?: string;
}

export const maybeShape = <
  TSchema extends Schema<{ [key: string]: any }>,
  TValue extends SchemaType<TSchema>
>(
  schema: TSchema,
  options?: Options,
) => {
  const validator = (value: any): Maybe<TValue> => {
    if (value == null || typeof value !== 'object') {
      return new None(() => 'Expected value to match Some<Object>');
    }

    const entries: [string, Some<unknown>][] = [];

    for (const key of Object.keys(schema)) {
      const maybeValue = schema[key](value[key]);

      if (maybeValue instanceof None) {
        return new None(() =>
          validationError([schema[key]], { object: options?.name, key }),
        );
      }

      entries.push([key, maybeValue.valueOf()]);
    }

    return new Some(Object.fromEntries(entries) as TValue);
  };

  if (options?.name != null) {
    validatorTypeNames.set(validator, [options.name]);
  }

  return validator;
};
