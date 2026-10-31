import kleur from "kleur";

export function banner(port) {
  return kleur.green(`listening on :${port}`);
}
