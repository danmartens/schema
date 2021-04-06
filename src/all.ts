import { Some } from './Some';
import { None } from './None';
import { Maybe } from './types';

export function all<A>(values: [Maybe<A>]): Maybe<A>;

export function all<A, B>(values: [Maybe<A>, Maybe<B>]): Maybe<[A, B]>;

export function all<A, B, C>(
  values: [Maybe<A>, Maybe<B>, Maybe<C>],
): Maybe<[A, B, C]>;

export function all<A, B, C>(
  values: [Maybe<A>] | [Maybe<A>, Maybe<B>] | [Maybe<A>, Maybe<B>, Maybe<C>],
): Maybe<[A]> | Maybe<[A, B]> | Maybe<[A, B, C]> {
  const result = [];

  for (const value of values) {
    if (value instanceof None) {
      return value;
    }

    result.push(value.valueOf());
  }

  return new Some(result) as Some<[A]> | Some<[A, B]> | Some<[A, B, C]>;
}
