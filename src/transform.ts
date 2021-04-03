import { Some } from './Some';
import { MaybeFactory } from './types';

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

export const snakeCase = (factory: MaybeFactory<string>) => {
  return (value: unknown) => {
    const maybe = factory(value);

    if (maybe instanceof Some) {
      return maybe.map((value) =>
        value
          .replace(/([A-Z]+)/g, '_$&')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '_')
          .replace(/(^_|_$)/g, ''),
      );
    }

    return maybe;
  };
};

export const camelCase = (factory: MaybeFactory<string>) => {
  return (value: unknown) => {
    const maybe = factory(value);

    if (maybe instanceof Some) {
      return maybe.map((value) =>
        value
          .replace(/^[^a-z0-9]+/i, '')
          .split(/[^a-z0-9]+/i)
          .map((word, index) =>
            index === 0
              ? word
              : word.substr(0, 1).toUpperCase() + word.substr(1),
          )
          .join(''),
      );
    }

    return maybe;
  };
};
