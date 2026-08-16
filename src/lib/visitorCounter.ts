/**
 * Global persistent visitor counter service.
 * Tracks visits across all devices (mobile, tablet, laptop, desktop) using
 * a cloud counter API with session deduplication, optimistic local caching,
 * and offline fallback.
 */

const COUNTER_NAMESPACE = "shahad-pathan-portfolio";
const COUNTER_KEY = "views";
const STORAGE_KEY = "shahad_global_portfolio_views";
const SESSION_KEY = "shahad_session_view_counted";

// Baseline offset to preserve prior visits before cloud integration
export const BASELINE_OFFSET = 120;

interface CounterResponse {
  value?: number;
  [key: string]: unknown;
}

/**
 * Gets the initial cached count immediately from localStorage to avoid layout shift.
 */
export function getInitialVisitorCount(): number {
  if (typeof window === "undefined") return BASELINE_OFFSET + 1;
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed = parseInt(cached, 10);
      if (!isNaN(parsed) && parsed > 0) {
        return parsed;
      }
    }
  } catch {
    // Ignore localStorage access errors (e.g. strict privacy modes)
  }
  return BASELINE_OFFSET + 1;
}

/**
 * Fetches the global persistent visitor count.
 * - Increments count (/hit) only once per visitor session (via sessionStorage).
 * - Reads current count (/get) on subsequent reloads/navigations within the same session.
 * - Synchronizes with localStorage for fast instant subsequent loads.
 */
export async function syncVisitorCount(): Promise<number> {
  if (typeof window === "undefined") return BASELINE_OFFSET + 1;

  let sessionCounted = false;
  try {
    sessionCounted = sessionStorage.getItem(SESSION_KEY) === "true";
  } catch {
    // Fallback if sessionStorage is blocked
  }

  // Determine whether to increment (new session) or just read (existing session)
  const action = sessionCounted ? "get" : "hit";
  const url = `https://abacus.jasoncameron.dev/${action}/${COUNTER_NAMESPACE}/${COUNTER_KEY}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = (await response.json()) as CounterResponse;
      if (typeof data.value === "number" && !isNaN(data.value)) {
        const total = BASELINE_OFFSET + data.value;

        // Mark session as counted
        try {
          sessionStorage.setItem(SESSION_KEY, "true");
          localStorage.setItem(STORAGE_KEY, total.toString());
        } catch {
          // Ignore storage quota or security errors
        }

        return total;
      }
    }
  } catch (error) {
    console.warn("Global visitor counter sync warning:", error);
  }

  // Fallback: Use cached value or fallback increment
  return getFallbackVisitorCount(sessionCounted);
}

function getFallbackVisitorCount(sessionCounted: boolean): number {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    let count = cached ? parseInt(cached, 10) : BASELINE_OFFSET + 1;
    if (isNaN(count) || count < 1) {
      count = BASELINE_OFFSET + 1;
    }

    if (!sessionCounted) {
      count += 1;
      localStorage.setItem(STORAGE_KEY, count.toString());
      sessionStorage.setItem(SESSION_KEY, "true");
    }

    return count;
  } catch {
    return BASELINE_OFFSET + 1;
  }
}
