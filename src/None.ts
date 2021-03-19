export class None {
  map(): None {
    return this;
  }

  flatMap(): None {
    return this;
  }

  orValue<R>(value: R): R {
    return value;
  }

  orThrow(message?: string): never {
    throw new Error(message ?? "Value does not match expected type");
  }

  orNull() {
    return null;
  }

  valueOf() {
    return undefined;
  }
}
