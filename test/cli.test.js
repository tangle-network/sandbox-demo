import { test } from "node:test";
import assert from "node:assert/strict";
import { parseFlags } from "../packages/cli/src/flags.js";

test("[cli-flag] --port takes a number", () => {
  assert.equal(parseFlags(["--port", "8080"]).port, 8080);
});

test("a bare flag is true", () => {
  assert.equal(parseFlags(["--verbose"]).verbose, true);
});
