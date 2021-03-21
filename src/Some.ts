import { None } from './None';
import { Maybe } from './types';

export class Some<T> {
  constructor(private value: T) {}

  map<R>(callbackFn: (wrapped: T) => R): Maybe<R> {
    const result = callbackFn(this.value);

    if (result != null) {
      return new Some(result);
    } else {
      return new None();
    }
  }

  flatMap<R>(callbackFn: (wrapped: T) => Maybe<R>) {
    return callbackFn(this.value);
  }

  orValue(): T {
    return this.value;
  }

  orNull(): T {
    return this.value;
  }

  orThrow(): T {
    return this.value;
  }

  valueOf(): T {
    return this.value;
  }

  toString() {
    return `Some(${this.value})`;
  }
}
