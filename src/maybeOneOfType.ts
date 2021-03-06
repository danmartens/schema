import { Some } from './Some';
import { None } from './None';
import { MaybeFactory } from './types';
import { validationError } from './validationError';

export function maybeOneOfType<A, B>(
  options: [MaybeFactory<A>, MaybeFactory<B>],
): MaybeFactory<A | B>;

export function maybeOneOfType<A, B, C>(
  options: [MaybeFactory<A>, MaybeFactory<B>, MaybeFactory<C>],
): MaybeFactory<A | B | C>;

export function maybeOneOfType<A, B, C, D>(
  options: [MaybeFactory<A>, MaybeFactory<B>, MaybeFactory<C>, MaybeFactory<D>],
): MaybeFactory<A | B | C | D>;

export function maybeOneOfType<A, B, C, D>(
  options:
    | [MaybeFactory<A>, MaybeFactory<B>]
    | [MaybeFactory<A>, MaybeFactory<B>, MaybeFactory<C>]
    | [MaybeFactory<A>, MaybeFactory<B>, MaybeFactory<C>, MaybeFactory<D>],
): MaybeFactory<A | B> | MaybeFactory<A | B | C> | MaybeFactory<A | B | C | D> {
  return (value) => {
    for (const option of options) {
      const maybeValue = option(value);

      if (maybeValue instanceof Some) {
        return maybeValue;
      }
    }

    return new None(() => validationError(options));
  };
}
