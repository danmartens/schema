import { Some } from '../Some';

const testSymbol = Symbol('test');
class TestClass {}

describe('Some#toString()', () => {
  test('boolean', () => {
    expect(new Some(true).toString()).toEqual('Some<boolean>');
  });

  test('number', () => {
    expect(new Some(42).toString()).toEqual('Some<number>');
  });

  test('string', () => {
    expect(new Some('Hello, World').toString()).toEqual('Some<string>');
  });

  test('symbol', () => {
    expect(new Some(testSymbol).toString()).toEqual('Some<symbol>');
  });

  test('Array', () => {
    expect(new Some([]).toString()).toEqual('Some<Array>');
  });

  test('Object', () => {
    expect(new Some({ title: 'Hello, World!' }).toString()).toEqual(
      'Some<Object>',
    );
  });

  test('class', () => {
    expect(new Some(new TestClass()).toString()).toEqual('Some<TestClass>');
  });
});
