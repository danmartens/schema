import { maybeCoercibleDate } from '../maybeCoercibleDate';
import { maybeShape } from '../maybeShape';
import { maybeString } from '../maybeString';
import { None } from '../None';
import { Some } from '../Some';

test('maybeShape', () => {
  const schema = maybeShape(
    {
      title: maybeString,
      publishedAt: maybeCoercibleDate,
      author: maybeShape({ name: maybeString }, { name: 'Author' }),
    },
    { name: 'Post' },
  );

  const valid = {
    title: 'Hello, World',
    publishedAt: '2020-01-01T00:00:00Z',
    author: { name: 'Jane Doe' },
  };

  expect(schema(valid)).toBeInstanceOf(Some);

  expect(schema(valid).valueOf()).toEqual({
    title: 'Hello, World',
    publishedAt: new Date('2020-01-01T00:00:00Z'),
    author: {
      name: 'Jane Doe',
    },
  });

  expect(schema({ title: 'Hello, World' })).toBeInstanceOf(None);

  expect(schema({ ...valid, title: 42 })).toBeInstanceOf(None);

  expect(() => {
    schema({ title: 42 }).orThrow();
  }).toThrowError('Expected value of "Post.title" to match Some<string>');

  expect(() => {
    schema({ ...valid, author: true }).orThrow();
  }).toThrowError('Expected value of "Post.author" to match Some<Author>');
});

xtest('nested shape error messages are clear', () => {
  const schema = maybeShape(
    {
      author: maybeShape({ name: maybeString }, { name: 'Author' }),
    },
    { name: 'Post' },
  );

  expect(() => {
    schema({ author: { name: 42 } }).orThrow();
  }).toThrowError('Expected value of "Author.name" to match Some<String>');
});

test('allows extra properties', () => {
  const schema = maybeShape(
    {
      title: maybeString,
    },
    { name: 'Post' },
  );

  expect(
    schema({
      title: 'Hello, World',
      abstract: 'A worldwide greeting.',
    }).valueOf(),
  ).toEqual({
    title: 'Hello, World',
    abstract: 'A worldwide greeting.',
  });
});

test('discards extra properties if "exact" is set to true', () => {
  const schema = maybeShape(
    {
      title: maybeString,
    },
    { name: 'Post', exact: true },
  );

  expect(
    schema({
      title: 'Hello, World!',
      abstract: 'A worldwide greeting.',
    }).valueOf(),
  ).toEqual({
    title: 'Hello, World!',
  });
});
