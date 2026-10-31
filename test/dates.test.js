import { test } from "node:test";
import assert from "node:assert/strict";
import { dayKey } from "../packages/shared/src/dates.js";

process.env.TZ = "America/New_York";

test("[timezone] day keys are UTC days", () => {
  assert.equal(dayKey(new Date("2026-01-02T02:30:00Z")), "2026-01-02");
});
