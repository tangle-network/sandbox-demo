const cache = new Map();

export function prefetch(url) {
  fetch(url).then((res) => res.json()).then((value) => cache.set(url, value));
}

export async function load(url) {
  if (cache.has(url)) return cache.get(url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  return res.json();
}
// TODO: expire cached entries
