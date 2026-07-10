/**
 * Resolutor de proof-of-work en el navegador (WebCrypto).
 * Busca `solution` tal que sha256(`${nonce}:${solution}`) tenga
 * `difficulty` bits a cero al principio.
 */

function leadingZeroBits(bytes: Uint8Array): number {
  let bits = 0;
  for (const byte of bytes) {
    if (byte === 0) {
      bits += 8;
      continue;
    }
    bits += Math.clz32(byte) - 24;
    break;
  }
  return bits;
}

export interface PowProgress {
  attempts: number;
  hashesPerSecond: number;
}

export async function solvePow(
  nonce: string,
  difficulty: number,
  onProgress?: (p: PowProgress) => void,
  shouldAbort?: () => boolean,
): Promise<string | null> {
  const encoder = new TextEncoder();
  const started = performance.now();
  let attempts = 0;

  for (let candidate = 0; candidate < 50_000_000; candidate++) {
    if (shouldAbort?.()) return null;

    const data = encoder.encode(`${nonce}:${candidate}`);
    const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", data));
    attempts++;

    if (leadingZeroBits(digest) >= difficulty) {
      onProgress?.({
        attempts,
        hashesPerSecond: Math.round(attempts / ((performance.now() - started) / 1000)),
      });
      return String(candidate);
    }

    // Cede el hilo y reporta progreso cada 2048 intentos
    if ((attempts & 2047) === 0) {
      onProgress?.({
        attempts,
        hashesPerSecond: Math.round(attempts / ((performance.now() - started) / 1000)),
      });
      await new Promise((r) => setTimeout(r, 0));
    }
  }
  return null;
}
