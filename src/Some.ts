import { None } from './None';
import { Maybe } from './types';

export class Some<TValue> {
  constructor(private value: TValue) {
    Object.freeze(this);
  }

  map<TMapped>(callbackFn: (wrapped: TValue) => TMapped): Maybe<TMapped> {
    const result = callbackFn(this.value);

    if (result != null) {
      return new Some(result);
    } else {
      return new None();
    }
  }

  flatMap<TMapped>(callbackFn: (wrapped: TValue) => Maybe<TMapped>) {
    return callbackFn(this.value);
  }

  orValue(): TValue {
    return this.value;
  }

  orThrow(): TValue {
    return this.value;
  }

  valueOf(): TValue {
    return this.value;
  }

  toString() {
    const value = this.value as unknown;

    if (typeof value === 'object' && value?.constructor?.name != null) {
      return `Some<${value.constructor.name}>`;
    }

    return `Some<${typeof value}>`;
  }
}
