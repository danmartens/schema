import { maybeConstant } from './maybeConstant';
import { maybeOneOfType } from './maybeOneOfType';
import { ConstantValue, MaybeFactory, MessageFactory } from './types';

export function maybeOneOf<A extends ConstantValue, B extends ConstantValue>(
  options: [A, B],
): MaybeFactory<A | B>;

export function maybeOneOf<
  A extends ConstantValue,
  B extends ConstantValue,
  C extends ConstantValue
>(options: [A, B, C]): MaybeFactory<A | B | C>;

export function maybeOneOf<
  A extends ConstantValue,
  B extends ConstantValue,
  C extends ConstantValue,
  D extends ConstantValue
>(options: [A, B, C, D]): MaybeFactory<A | B | C | D>;

export function maybeOneOf<
  A extends ConstantValue,
  B extends ConstantValue,
  C extends ConstantValue,
  D extends ConstantValue
>(
  options: [A, B] | [A, B, C] | [A, B, C, D],
): MaybeFactory<A | B> | MaybeFactory<A | B | C> | MaybeFactory<A | B | C | D> {
  const message: MessageFactory = () => () => {
    return `Value must be one of ${options
      .map((option: ConstantValue) => JSON.stringify(option))
      .join(', ')}`;
  };

  switch (options.length) {
    case 2:
      return maybeOneOfType(
        [maybeConstant(options[0]), maybeConstant(options[1])],
        message,
      );

    case 3:
      return maybeOneOfType(
        [
          maybeConstant(options[0]),
          maybeConstant(options[1]),
          maybeConstant(options[2]),
        ],
        message,
      );

    case 4:
      return maybeOneOfType(
        [
          maybeConstant(options[0]),
          maybeConstant(options[1]),
          maybeConstant(options[2]),
          maybeConstant(options[3]),
        ],
        message,
      );
  }
}
