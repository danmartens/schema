import { MaybeFactory } from "./types";
import { maybeBoolean } from "./maybeBoolean";
import { maybeNumber } from "./maybeNumber";
import { maybeString } from "./maybeString";

export const validatorTypeNames = new WeakMap<MaybeFactory<unknown>, string[]>([
  [maybeBoolean, ["boolean"]],
  [maybeNumber, ["number"]],
  [maybeString, ["string"]],
]);
