import { maybeBoolean } from './maybeBoolean';
import { maybeNumber } from './maybeNumber';
import { maybeString } from './maybeString';
import { maybeArrayOf } from './maybeArrayOf';
import { nullable } from './nullable';
import { MaybeFactory } from './types';

export const boolean = nullable(maybeBoolean);
export const number = nullable(maybeNumber);
export const string = nullable(maybeString);

export const arrayOf = <TValue>(factory: MaybeFactory<TValue>) =>
  nullable(maybeArrayOf(factory));
