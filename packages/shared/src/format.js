export function displayName(user) {
  return user.name.trim();
}

export function initials(name) {
  return name.split(/\s+/).map((part) => part[0].toUpperCase()).join("");
}
