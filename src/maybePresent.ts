import { Some } from './Some';
import { None } from './None';
import { Maybe } from './types';

export function maybePresent<T>(value: T): Maybe<T> {
  if (isPresent(value)) {
    return new Some(value);
  } else {
    return new None();
  }
}

const isPresent = (value: any): boolean => {
  if (value == null) {
    return false;
  }

  if (typeof value === 'string') {
    return /[^\s]+/.test(value);
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length > 0;
  }

  return true;
};
