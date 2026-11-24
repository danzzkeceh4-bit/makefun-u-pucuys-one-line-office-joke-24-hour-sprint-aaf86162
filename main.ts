import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Output contract: exactly one line, 1-200 characters, no trailing newline.
const JOKE =
  "The meeting that could have been an email ended with a follow-up meeting to discuss why the email was never sent.";

// Validate the entry against the sealed scorer gate before writing:
// UTF-8 text, 1-200 code points, not whitespace-only, exactly one line.
const codePoints = [...JOKE].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry length ${codePoints} code points outside 1-200`);
}
if (JOKE.trim().length === 0 || JOKE.includes("\n")) {
  throw new Error("entry must be a single non-empty line");
}

mkdirSync(OUTPUT_DIR, { recursive: true });
const entryPath = join(OUTPUT_DIR, "entry.txt");
writeFileSync(entryPath, JOKE, "utf8");

// Read-back guard: what landed on disk must be byte-identical to JOKE.
const written = readFileSync(entryPath, "utf8");
if (written !== JOKE) {
  throw new Error("entry.txt read-back mismatch");
}
