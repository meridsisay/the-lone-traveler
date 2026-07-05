/**
 * Public pages degrade to their designed empty states instead of crashing
 * when the database is unreachable (fresh clone before setup, Neon hiccup).
 * Admin pages intentionally do NOT use this — there a failure should be loud.
 */
export async function safeQuery<T>(
  fallback: T,
  fn: () => Promise<T>
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error("[db] public query failed:", error);
    return fallback;
  }
}
