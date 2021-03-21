import { Some } from './Some';
import { Maybe } from './types';

export function compact<T>(values: Maybe<T>[]): Some<T>[] {
  return values.filter((value) => value instanceof Some) as Some<T>[];
}
