import { None } from './None';
import { Schema, SchemaType } from './types';

interface Options<TValue> {
  messages?: Partial<{ [K in keyof TValue]: string }>;
}

export const validateShape = <
  TSchema extends Schema<{ [key: string]: any }>,
  TValue extends SchemaType<TSchema>
>(
  schema: TSchema,
  options?: Options<TValue>,
) => (
  value: Partial<{ [K in keyof TValue]: unknown }>,
): Partial<{ [K in keyof TValue]: string }> => {
  const messages = options?.messages;

  const errors: Partial<{ [K in keyof TValue]: string }> = {};

  for (const [key, validate] of Object.entries(schema)) {
    if (validate(value[key]) instanceof None) {
      if (messages != null && key in messages) {
        errors[key as keyof TValue] = messages[key];
      } else {
        errors[key as keyof TValue] = 'This field is invalid';
      }
    }
  }

  return errors;
};
