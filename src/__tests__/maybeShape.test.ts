import { maybeCoercibleDate } from '../maybeCoercibleDate';
import { maybeShape } from '../maybeShape';
import { maybeString } from '../maybeString';
import { None } from '../None';
import { Some } from '../Some';

test('maybeShape', () => {
  const postSchema = maybeShape(
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

  expect(postSchema(valid)).toBeInstanceOf(Some);

  expect(postSchema(valid).valueOf()).toEqual({
    title: 'Hello, World',
    publishedAt: new Date('2020-01-01T00:00:00Z'),
    author: {
      name: 'Jane Doe',
    },
  });

  expect(postSchema({ title: 'Hello, World' })).toBeInstanceOf(None);

  expect(postSchema({ ...valid, title: 42 })).toBeInstanceOf(None);

  expect(() => {
    postSchema({ title: 42 }).orThrow();
  }).toThrowError('Expected value of "Post.title" to match Some<string>');

  expect(() => {
    postSchema({ ...valid, author: true }).orThrow();
  }).toThrowError('Expected value of "Post.author" to match Some<Author>');

  expect(() => {
    postSchema({ ...valid, author: { name: 42 } }).orThrow();
  }).toThrowError('Expected value of "Author.name" to match Some<String>');
});
