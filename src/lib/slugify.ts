// "Plasma-assisted ignition, explained" → "plasma-assisted-ignition-explained"
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
