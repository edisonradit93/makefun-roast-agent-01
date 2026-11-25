import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { generateRoast, validateRoast } from './roast.ts';

function main(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  const roast = generateRoast();
  validateRoast(roast);

  mkdirSync(outputDir, { recursive: true });
  const entryPath = join(outputDir, 'entry.txt');
  const payload = `${roast}\n`;
  writeFileSync(entryPath, payload, 'utf8');

  const byteCount = Buffer.byteLength(roast, 'utf8');
  const sha256 = createHash('sha256').update(payload, 'utf8').digest('hex');

  console.log(`Wrote roast entry to ${entryPath}`);
  console.log(`Length: ${roast.length} chars (${byteCount} UTF-8 bytes)`);
  console.log(`SHA-256: ${sha256}`);
}

main();
