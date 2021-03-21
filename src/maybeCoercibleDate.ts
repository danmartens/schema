import { None } from './None';
import { Some } from './Some';
import { MaybeFactory } from './types';

export const maybeCoercibleDate: MaybeFactory<Date> = (value) => {
  if (value instanceof Date) {
    return new Some(value);
  }

  if (
    typeof value === 'string' &&
    /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{1,2}:\d{2}))?$/.test(
      value,
    )
  ) {
    return new Some(new Date(value));
  }

  return new None(() => 'Expected value to match Some<Date | string>');
};
