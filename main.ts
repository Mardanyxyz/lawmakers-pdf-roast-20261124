import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const SENTENCE =
  "The committee chair writing the law that will govern artificial intelligence emailed his aide a Word file named FINAL_final_REALLYFINAL and asked her to turn it into a PDF.";

const codePoints = [...SENTENCE];
if (codePoints.length < 1 || codePoints.length > 320) {
  throw new Error(
    `sentence is ${codePoints.length} characters, must be 1-320`,
  );
}
if (
  SENTENCE !== SENTENCE.trim() ||
  SENTENCE.includes("  ") ||
  SENTENCE.includes("\n")
) {
  throw new Error("sentence must be a single clean line with no extra spaces");
}
const terminators = SENTENCE.match(/[.!?]/g) ?? [];
if (terminators.length !== 1 || !SENTENCE.endsWith(".")) {
  throw new Error("entry must be exactly one sentence");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", SENTENCE, "utf8");
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== SENTENCE) {
  throw new Error("round-trip check failed: entry.txt does not match the sentence");
}
console.log(`wrote ${codePoints.length} characters to /output/entry.txt`);
