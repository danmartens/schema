import { Some } from './Some';
import { None } from './None';
import { MaybeFactory } from './types';

export const maybeString: MaybeFactory<string> = (value) => {
  if (typeof value === 'string') {
    return new Some(value);
  } else {
    return new None();
  }
};
