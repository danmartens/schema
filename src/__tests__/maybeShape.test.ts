import { maybeBoolean } from "../maybeBoolean";
import { maybeShape } from "../maybeShape";
import { maybeString } from "../maybeString";
import { None } from "../None";
import { Some } from "../Some";

test("maybeShape", () => {
  const postSchema = maybeShape(
    {
      title: maybeString,
      published: maybeBoolean,
      author: maybeShape({ name: maybeString }, { name: "Author" }),
    },
    { name: "Post" }
  );

  const value = {
    title: "Hello, World",
    published: true,
    author: { name: "Jane Doe" },
  };

  expect(postSchema(value)).toBeInstanceOf(Some);

  expect(postSchema(value).valueOf()).toEqual({
    title: "Hello, World",
    published: true,
    author: {
      name: "Jane Doe",
    },
  });

  expect(postSchema({ title: "Hello, World" })).toBeInstanceOf(None);

  expect(postSchema({ ...value, title: 42 })).toBeInstanceOf(None);

  expect(() => {
    postSchema({ title: 42 }).orThrow();
  }).toThrowError('Expected value of "Post.title" to match Some<string>');

  expect(() => {
    postSchema({ ...value, author: true }).orThrow();
  }).toThrowError('Expected value of "Post.author" to match Some<Author>');

  expect(() => {
    postSchema({ ...value, author: { name: 42 } }).orThrow();
  }).toThrowError('Expected value of "Author.name" to match Some<String>');
});
