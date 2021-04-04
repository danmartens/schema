import { upperCase } from '../transform';
import { maybeOneOf } from '../maybeOneOf';

test('maybeOneOf', () => {
  const maybeStatus = maybeOneOf([
    'pending',
    'complete',
    'shipped',
    'delivered',
  ]);

  expect(maybeStatus('pending').valueOf()).toEqual('pending');
  expect(maybeStatus('complete').valueOf()).toEqual('complete');
  expect(maybeStatus('shipped').valueOf()).toEqual('shipped');
  expect(maybeStatus('delivered').valueOf()).toEqual('delivered');

  expect(maybeStatus('invalid').valueOf()).toBeUndefined();

  expect(() => {
    maybeStatus('invalid').orThrow();
  }).toThrowError(
    'Expected value to match Some<"pending" | "complete" | "shipped" | "delivered">',
  );
});
