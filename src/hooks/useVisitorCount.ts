import { useState, useEffect } from "react";
import { getInitialVisitorCount, syncVisitorCount } from "@/lib/visitorCounter";

/**
 * Hook to manage persistent global visitor count across devices & sessions.
 * Returns the current visitor count and loading state.
 */
export function useVisitorCount() {
  const [count, setCount] = useState<number>(getInitialVisitorCount);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    syncVisitorCount()
      .then((updatedCount) => {
        if (isMounted) {
          setCount(updatedCount);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { count, isLoading };
}
