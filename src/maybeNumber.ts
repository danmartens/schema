import { Some } from './Some';
import { None } from './None';
import { MaybeFactory } from './types';

export const maybeNumber: MaybeFactory<number> = (value) => {
  if (typeof value === 'number') {
    return new Some(value);
  } else {
    return new None();
  }
};
