import lodashCamelCase from 'lodash.camelcase';
import lodashSnakeCase from 'lodash.snakecase';
import { Some } from './Some';
import { None } from './None';
import { Maybe, MaybeFactory } from './types';

export const upperCase = (factory: MaybeFactory<string>) => {
  return (value: unknown) => {
    const maybe = factory(value);

    if (maybe instanceof Some) {
      return maybe.map((value) => value.toUpperCase());
    }

    return maybe;
  };
};

export const lowerCase = (factory: MaybeFactory<string>) => {
  return (value: unknown) => {
    const maybe = factory(value);

    if (maybe instanceof Some) {
      return maybe.map((value) => value.toLowerCase());
    }

    return maybe;
  };
};

export const camelCase = (factory: MaybeFactory<string>) => {
  return (value: unknown) => {
    const maybe = factory(value);

    if (maybe instanceof Some) {
      return maybe.map(lodashCamelCase);
    }

    return maybe;
  };
};

export const snakeCase = (factory: MaybeFactory<string>) => {
  return (value: unknown) => {
    const maybe = factory(value);

    if (maybe instanceof Some) {
      return maybe.map(lodashSnakeCase);
    }

    return maybe;
  };
};

export const mapValue = <
  TValueMap extends Record<string, unknown>,
  TKey extends keyof TValueMap
>(
  valueMap: TValueMap,
) => (value: unknown): Maybe<TValueMap[TKey]> => {
  const message = () =>
    `Expected value to match Some<${Object.keys(valueMap)
      .map((key) => `"${key}"`)
      .join(' | ')}>`;

  if (typeof value !== 'string') {
    return new None(message);
  }

  if (value in valueMap) {
    return new Some(valueMap[value] as TValueMap[TKey]);
  }

  return new None(message);
};
