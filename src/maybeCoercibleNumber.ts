import { None } from './None';
import { Some } from './Some';
import { MaybeFactory } from './types';

export const maybeCoercibleNumber: MaybeFactory<number> = (value) => {
  if (typeof value === 'number') {
    return new Some(value);
  }

  if (typeof value === 'string' && /^\d+(\.\d+)?$/.test(value)) {
    return new Some(parseFloat(value));
  }

  return new None();
};
