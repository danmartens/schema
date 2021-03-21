export class None {
  constructor(private message: () => string | undefined = () => undefined) {}

  map(): None {
    return this;
  }

  flatMap(): None {
    return this;
  }

  orValue<R>(value: R): R {
    return value;
  }

  orThrow(): never {
    const message = this.message();

    throw new Error(message ?? 'Expected value to match Some<unknown>');
  }

  orNull() {
    return null;
  }

  valueOf() {
    return undefined;
  }
}
