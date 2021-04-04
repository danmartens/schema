import { validateShape } from '../validateShape';
import { nullable } from '../nullable';
import { maybeString } from '../maybeString';
import { maybeNumber } from '../maybeNumber';

test('validateShape', () => {
  const validator = validateShape(
    {
      firstName: maybeString,
      lastName: maybeString,
      age: nullable(maybeNumber),
    },
    {
      messages: { age: 'Age is invalid' },
    },
  );

  expect(validator({ firstName: 'Jane', lastName: 'Doe', age: 42 })).toEqual(
    {},
  );

  expect(validator({ firstName: 'Jane', lastName: 'Doe' })).toEqual({});

  expect(validator({ firstName: 42, lastName: 'Doe' })).toEqual({
    firstName: 'This field is invalid',
  });

  expect(validator({ firstName: 'Jane' })).toEqual({
    lastName: 'This field is invalid',
  });

  expect(validator({ firstName: 'Jane', lastName: 'Doe', age: true })).toEqual({
    age: 'Age is invalid',
  });
});
