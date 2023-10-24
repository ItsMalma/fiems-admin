import { useRouter } from "next/router";
import React from "react";

export function useQuery(name: string): string | undefined {
  const router = useRouter();

  return React.useMemo(() => {
    const query = router.query[name];
    if (typeof query === "string") return query;
    else if (typeof query === "object" && query.length > 0) return query[0];
    return undefined;
  }, [name, router.query]);
}
