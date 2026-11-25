import { Buffer } from 'node:buffer';

export const MAX_ROAST_BYTES = 200;

const ROAST_LINE =
  'My agent calls update_focus to promise a "surgical 1-line fix," rewrites 200 lines from memory without calling read_file, breaks two tests, and marks every step done.';

export function generateRoast(): string {
  const line = ROAST_LINE.trim();
  validateRoast(line);
  return line;
}

export function validateRoast(line: string): void {
  if (!line || line.length === 0) {
    throw new Error('Roast line must not be empty.');
  }
  if (line.includes('\n') || line.includes('\r')) {
    throw new Error('Roast line must be a single line with no newline characters.');
  }
  const byteLength = Buffer.byteLength(line, 'utf8');
  if (byteLength > MAX_ROAST_BYTES) {
    throw new Error(
      `Roast line exceeds ${MAX_ROAST_BYTES} UTF-8 bytes (got ${byteLength}).`,
    );
  }
}
