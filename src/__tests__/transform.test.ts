import {
  lowerCase,
  upperCase,
  snakeCase,
  camelCase,
  mapValue,
} from '../transform';
import { maybeString } from '../maybeString';

test('upperCase', () => {
  expect(upperCase(maybeString)('hello world').valueOf()).toEqual(
    'HELLO WORLD',
  );
});

test('lowerCase', () => {
  expect(lowerCase(maybeString)('HELLO WORLD').valueOf()).toEqual(
    'hello world',
  );
});

test('snakeCase', () => {
  expect(snakeCase(maybeString)('hello world').valueOf()).toEqual(
    'hello_world',
  );

  expect(upperCase(snakeCase(maybeString))('hello world').valueOf()).toEqual(
    'HELLO_WORLD',
  );
});

test('camelCase', () => {
  expect(camelCase(maybeString)('hello world').valueOf()).toEqual('helloWorld');
});

test('mapValue', () => {
  expect(
    mapValue({ pending: 'PENDING', complete: 'COMPLETE' })('pending').valueOf(),
  ).toEqual('PENDING');

  expect(() => {
    mapValue({ pending: 'PENDING', complete: 'COMPLETE' })('invalid').orThrow();
  }).toThrowError('Expected value to match Some<"pending" | "complete">');
});
