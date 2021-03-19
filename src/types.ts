import type { Some } from "./Some";
import type { None } from "./None";

export type Maybe<T> = Some<T> | None;

/**
 * Extracts the type of the Some part of a Maybe
 */
export type MaybeType<T> = T extends Some<infer V> ? V : never;

export type MaybeFactory<T> = (value: unknown) => Maybe<T>;

export type Schema<T extends { [key: string]: any }> = {
  [K in keyof T]: (value: any) => Some<T[K]> | None;
};

/**
 * Extracts the type that a Schema represents
 */
export type SchemaType<T> = T extends Schema<infer S> ? S : never;

export type ConstantValue = string | number;
