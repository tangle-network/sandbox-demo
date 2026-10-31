import { test } from "node:test";
import assert from "node:assert/strict";
import { displayName, initials } from "../packages/shared/src/format.js";

test("[null-guard] a user without a name is anonymous", () => {
  assert.equal(displayName(null), "anonymous");
  assert.equal(displayName({}), "anonymous");
});

test("display names are trimmed", () => {
  assert.equal(displayName({ name: "  Ada Lovelace " }), "Ada Lovelace");
});

test("initials", () => {
  assert.equal(initials("Ada Lovelace"), "AL");
});
