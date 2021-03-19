import { Some } from "./Some";
import { None } from "./None";
import { Maybe } from "./types";

export function all<A>(values: [Maybe<A>]): Maybe<A>;

export function all<A, B>(
  values: [Maybe<A>, Maybe<B>]
): Some<[A, B]> | None<any>;

export function all<A, B, C>(
  values: [Maybe<A>, Maybe<B>, Maybe<C>]
): Some<[A, B, C]> | None<any>;

export function all<A, B, C>(
  values: [Maybe<A>] | [Maybe<A>, Maybe<B>] | [Maybe<A>, Maybe<B>, Maybe<C>]
): Some<[A]> | Some<[A, B]> | Some<[A, B, C]> | None<any> {
  const result = [];

  for (const value of values) {
    if (value instanceof None) {
      return value;
    }

    result.push(value.orNull());
  }

  return new Some(result) as Some<[A]> | Some<[A, B]> | Some<[A, B, C]>;
}
