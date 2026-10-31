import { test } from "node:test";
import assert from "node:assert/strict";

function isPrime(n) {
  if (n < 2) return false;
  for (let d = 2; d < n; d++) if (n % d === 0) return false;
  return true;
}

test("[primes] there are 9592 primes below 100000", () => {
  let count = 0;
  for (let n = 0; n < 100_000; n++) if (isPrime(n)) count++;
  assert.equal(count, 9592);
});
