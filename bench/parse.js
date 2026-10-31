// Parses 200,000 log lines like: ts=1700000000 level=info msg="..." ms=12
const lines = [];
for (let i = 0; i < 200_000; i++) {
  lines.push(`ts=${1_700_000_000 + i} level=${i % 7 ? "info" : "error"} msg="request ${i} done" ms=${i % 250}`);
}
const input = lines.join("\n");

export function parse(text) {
  const records = [];
  for (const line of text.split("\n")) {
    const record = {};
    for (const field of line.match(/\w+=("[^"]*"|\S+)/g) ?? []) {
      const [key, ...rest] = field.split("=");
      let value = rest.join("=");
      if (value.startsWith('"')) value = value.slice(1, -1);
      record[key] = /^\d+$/.test(value) ? Number(value) : value;
    }
    records.push(JSON.parse(JSON.stringify(record)));
  }
  return records;
}

const start = performance.now();
const records = parse(input);
const errors = records.filter((r) => r.level === "error").length;
console.log(`${records.length} lines, ${errors} errors, ${(performance.now() - start).toFixed(0)} ms`);
