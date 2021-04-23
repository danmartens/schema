# Schema

## Basic Concepts

### Some, None, and Maybe

Schema uses a few basic monad classes to indicate whether a value matches the expected type (`Some`) or does not match the expected type (`None`). A value that has not yet been validated is represented by the `Maybe` type.

For example, a value that we expect to be a number would be represented as `Some<number> | None`. Which can be simplified to `Maybe<number>`.

#### Unwrapping Values

`Some` and `None` both implement a few methods for “unwrapping” the contained value.

##### Maybe#valueOf()

`Some#valueOf()` returns the contained value:

```typescript
new Some(42).valueOf() // => 42
```

While `None#valueOf()` always returns `undefined`:

```typescript
new None().valueOf() // => undefined
```

This can combined with the nullish-coalescing operator (`??`) to provide default values:

```typescript
new Some(42).valueOf() ?? 0  // => 42
new None().valueOf() ?? 0 // => 0
```

##### Maybe#orThrow()

`Some#orThrow()` behaves exactly like `Some#valueOf()`:

```typescript
new Some(42).orThrow() // => 42
```

While `None#orThrow()` always throws an `Error`:

```typescript
new None().orThrow() // Error: Expected value to match Some
```

This is useful for situations where a default value does not make sense:

```typescript
const square = (maybe: Maybe<number>): number => {
  const value = maybe.orThrow();
  
  return value * value;
}

square(new Some(42)) // => 1764
square(new None()) // => Error: Expected value to match Some
```


### Validators

A Validator is a function which accepts a value and returns either `Some` or `None`. For example, a number Validator would have the following type signature:
 
```typescript
(unknown) => Some<number> | None
```

Which can be simplified to:

```typescript
(unknown) => Maybe<number>
```

An implementation of the number Validator would look something like this:

```typescript
const maybeNumber = (value: unknown): Maybe<number> => {
  if (typeof value !== 'number') {
    return new None();
  }

  return new Some(value);
}
```

### Transformers

A Transformer is a function which accepts a Validator and returns a new Validator. Transformers can be used to normalize data before it is validated. For example, a Transformer that converts a string to uppercase would have the following signature:

```typescript
(Validator<string>) => Validator<string>
```

The implementation for this Transformer would look something like this:

```typescript
const uppercase = (validate: Validator<string>) => (value: unknown) => {
  if (typeof value !== 'string') {
    return new None();
  }

  return validate(value.toUpperCase());
};
```

We can simplify the implementation by using the built-in `maybeString()` Validator and the `flatMap()` monad method:

```typescript
const uppercase = (validate: Validator<string>) =>
  (value: unknown) => maybeString(value).flatMap(
    (stringValue) => validate(
      stringValue.toUpperCase()
    )
  );
```

This Transformer could be used with the built-in `maybeOneOf()` Validator to create a case-insensitive enum Validator:

```typescript
const maybeOrderStatus = uppercase(maybeOneOf('PENDING', 'COMPLETE', 'SHIPPED'));

maybeOrderStatus('COMPLETE').orThrow(); // => 'COMPLETE'
maybeOrderStatus('complete').orThrow(); // => 'COMPLETE'
maybeOrderStatus('invalid').orThrow(); // => Error: Expected value to match Some<'PENDING' | 'COMPLETE' | 'SHIPPED'>
```

### Schemas

Schemas are objects whose values are Validators. They’re used to validate more complex data. A schema for validating blog post data might look something like this:

```typescript
const postSchema = {
  title: maybeString,
  published: maybeBoolean,
}
```

Schemas can be used with the built-in `maybeShape()` validator:

```typescript
const maybePost = maybeShape(postSchema);

maybePost({ title: 'Hello, world!', published: true }).valueOf() // => { title: 'Hello, world!', published: true }

maybePost({ title: 'Hello, world!', published: 'yes' }).valueOf() // => undefined

maybePost({ title: 'Hello, world!' }).valueOf() // => undefined

maybePost(42).valueOf() // => undefined
```

They can also be used with the `validate()` function to provide validation errors messages for each invalid or missing value:

```typescript
const validatePost = validate(postSchema);

validatePost({ title: 'Hello, world!', published: true }) // => {}

validatePost({ title: 'Hello, world!', published: 'yes' }) // => { published: 'This field is invalid' }

validatePost({ title: 'Hello, world!' }) // => { published: 'This field is invalid' }

validatePost(42) // => { title: 'This field is invalid', published: 'This field is invalid' }
```
