export class None<T> {
  map(): None<T> {
    return this;
  }

  flatMap(): None<T> {
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
}
