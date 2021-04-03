import { lowerCase, upperCase, snakeCase, camelCase } from '../transform';
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

  expect(snakeCase(maybeString)('helloWorld').valueOf()).toEqual('hello_world');

  expect(snakeCase(maybeString)('_helloWorld_').valueOf()).toEqual(
    'hello_world',
  );

  expect(snakeCase(maybeString)('HELLO WORLD').valueOf()).toEqual(
    'hello_world',
  );

  expect(snakeCase(maybeString)('helloWORLD').valueOf()).toEqual('hello_world');

  expect(upperCase(snakeCase(maybeString))('hello world').valueOf()).toEqual(
    'HELLO_WORLD',
  );
});

test('camelCase', () => {
  expect(camelCase(maybeString)('hello world').valueOf()).toEqual('helloWorld');

  expect(camelCase(maybeString)('hello-world').valueOf()).toEqual('helloWorld');

  expect(camelCase(maybeString)('hello_world').valueOf()).toEqual('helloWorld');

  expect(camelCase(maybeString)('__hello_world__').valueOf()).toEqual(
    'helloWorld',
  );

  expect(camelCase(maybeString)('helloWorld').valueOf()).toEqual('helloWorld');
});
