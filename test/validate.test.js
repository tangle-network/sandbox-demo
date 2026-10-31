import { test } from "node:test";
import assert from "node:assert/strict";
import { validateBody } from "../packages/api/src/validate.js";

test("a body with every field passes", () => {
  assert.deepEqual(validateBody({ name: "string" }, { name: "Ada" }), []);
});

test("a missing field fails", () => {
  assert.deepEqual(validateBody({ name: "string" }, {}), ["name must be a string"]);
});
