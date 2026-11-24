import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Output contract: exactly one line, 1-200 characters, no trailing newline.
const JOKE =
  "The meeting that could have been an email ended with a follow-up meeting to discuss why the email was never sent.";

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "entry.txt"), JOKE, "utf8");
