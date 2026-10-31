export function validateBody(schema, body) {
  if (typeof body !== "object" || body === null) return ["body must be an object"];
  const errors = [];
  for (const [key, type] of Object.entries(schema)) {
    if (typeof body[key] !== type) errors.push(`${key} must be a ${type}`);
  }
  return errors;
}
