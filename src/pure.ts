import { Maybe, MaybeFactory } from './types';

export const pure = <TValue>(
  maybeValue: MaybeFactory<TValue>,
): MaybeFactory<TValue> => {
  const cache = new WeakMap<any, Maybe<TValue>>();

  return (value: unknown) => {
    if (value == null || typeof value !== 'object') {
      return maybeValue(value);
    }

    let result = cache.get(value);

    if (result == null) {
      result = maybeValue(value);

      cache.set(value, result);
    }

    return result;
  };
};
