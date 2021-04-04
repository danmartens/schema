export class None {
  constructor(private message: () => string | undefined = () => undefined) {
    Object.freeze(this);
  }

  map(): None {
    return this;
  }

  flatMap(): None {
    return this;
  }

  orValue<TValue>(value: TValue): TValue {
    return value as TValue;
  }

  orThrow(): never {
    const message = this.message();

    throw new Error(message ?? 'Expected value to match Some<unknown>');
  }

  valueOf() {
    return undefined;
  }

  toString() {
    return 'None';
  }
}
