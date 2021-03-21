import { maybeCoercibleDate } from '../maybeCoercibleDate';

test('maybeCoercibleDate', () => {
  const date = new Date();

  expect(maybeCoercibleDate(date).valueOf()).toEqual(date);

  expect(maybeCoercibleDate(date.toISOString()).valueOf()).toEqual(date);

  expect(() => {
    maybeCoercibleDate(42).orThrow();
  }).toThrowError('Expected value to match Some<Date | string>');
});
