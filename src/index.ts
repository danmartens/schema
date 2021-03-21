import { maybeBoolean } from './maybeBoolean';
import { maybeNumber } from './maybeNumber';
import { maybeString } from './maybeString';
import { maybeArrayOf } from './maybeArrayOf';
import { maybeShape } from './maybeShape';
import { maybeOneOfType } from './maybeOneOfType';
import { maybeOneOf } from './maybeOneOf';
import { maybeConstant } from './maybeConstant';
import { maybeCoercibleNumber } from './maybeCoercibleNumber';
import { maybeCoercibleDate } from './maybeCoercibleDate';
import { nullable } from './nullable';
import { pure } from './pure';
import { MaybeFactory } from './types';

export const boolean = maybeBoolean;
export const number = maybeNumber;
export const string = maybeString;
export const arrayOf = maybeArrayOf;
export const shape = maybeShape;
export const oneOfType = maybeOneOfType;
export const oneOf = maybeOneOf;
export const constant = maybeConstant;

export namespace optional {
  export const boolean = nullable(maybeBoolean);
  export const number = nullable(maybeNumber);
  export const string = nullable(maybeString);

  export const arrayOf = <TValue>(factory: MaybeFactory<TValue>) =>
    nullable(maybeArrayOf(factory));
}

export namespace coercible {
  export const number = maybeCoercibleNumber;
  export const date = maybeCoercibleDate;
}

export { nullable, pure };
