import { None } from './None';
import { Schema, SchemaType } from './types';

export const validateShape = <
  TSchema extends Schema<{ [key: string]: any }>,
  TValue extends SchemaType<TSchema>
>(
  schema: TSchema,
) => (
  value: Partial<{ [K in keyof TValue]: unknown }>,
): Partial<{ [K in keyof TValue]: string }> => {
  const errors: Partial<{ [K in keyof TValue]: string }> = {};

  for (const [key, validate] of Object.entries(schema)) {
    if (validate(value[key]) instanceof None) {
      errors[key as keyof TValue] = 'This field is invalid';
    }
  }

  return errors;
};
