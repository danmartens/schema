import { camelCaseKeys } from '../transformKeys';
import { maybeShape } from '../maybeShape';
import { maybeString } from '../maybeString';

test('transformKeys', () => {
  const maybePost = camelCaseKeys(
    maybeShape({ title: maybeString }, { name: 'Post' }),
  );

  expect(maybePost({ Title: 'Hello, World!' }).valueOf()).toEqual({
    title: 'Hello, World!',
  });

  expect(maybePost({ Title: 42 }).valueOf()).toEqual(undefined);
});
