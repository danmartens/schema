import camelCase from 'lodash.camelcase';
import { None } from './None';
import { MaybeFactory } from './types';

export const transformKeys = <TValue>(
  factory: MaybeFactory<TValue>,
  transform: (key: string) => string,
): MaybeFactory<TValue> => {
  return (value: unknown) => {
    if (typeof value === 'object' && value != null) {
      return factory(
        Object.fromEntries(
          Object.entries(value).map(([key, value]) => [transform(key), value]),
        ),
      );
    }

    return new None();
  };
};

export const camelCaseKeys = <TValue>(
  factory: MaybeFactory<TValue>,
): MaybeFactory<TValue> => transformKeys(factory, camelCase);
