import { Some } from './Some';
import { None } from './None';
import { Schema, SchemaType, Maybe } from './types';
import { validationError } from './validationError';
import { validatorTypeNames } from './validatorTypeNames';

export function maybeShape<
  TSchema extends Schema<{ [key: string]: any }>,
  TValue extends SchemaType<TSchema>
>(
  schema: TSchema,
  options: { name: string; exact: true },
): (value: unknown) => Maybe<TValue>;

export function maybeShape<
  TSchema extends Schema<{ [key: string]: any }>,
  TValue extends SchemaType<TSchema>
>(
  schema: TSchema,
  options: { name: string; exact?: false },
): (value: unknown) => Maybe<TValue & { [key: string]: unknown }>;

export function maybeShape<
  TSchema extends Schema<{ [key: string]: any }>,
  TValue extends SchemaType<TSchema>
>(schema: TSchema, options: { name: string; exact?: boolean }) {
  const validator = (value: unknown) => {
    if (typeof value === 'object' && value != null) {
      const entries: [string, unknown][] =
        options?.exact === true ? [] : Object.entries(value);

      for (const key of Object.keys(schema)) {
        const maybeValue = schema[key]((value as Record<string, unknown>)[key]);

        if (maybeValue instanceof None) {
          return new None(() =>
            validationError([schema[key]], { object: options?.name, key }),
          );
        }

        entries.push([key, maybeValue.valueOf()]);
      }

      return new Some(Object.fromEntries(entries) as TValue);
    }

    return new None(() => 'Expected value to match Some<Object>');
  };

  if (options?.name != null) {
    validatorTypeNames.set(validator, [options.name]);
  }

  return validator;
}
