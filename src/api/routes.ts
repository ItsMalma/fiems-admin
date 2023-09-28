import React from "react";
import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";
import { ApiResponsePayload } from "@/libs/utils";
import { RouteOutput, SaveRouteInput } from "@/models/route.model";

// Buat dan tambah route baru
export async function createRoute(input: SaveRouteInput) {
  await fetch("/api/routes", {
    method: "POST",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Ubah (update) route
export async function updateRoute(code: string, input: SaveRouteInput) {
  await fetch(`/api/routes/${code}`, {
    method: "PUT",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Mendapatkan semua route
export function useRoutes(deps?: React.DependencyList) {
  const { data, error, isLoading, mutate } = useSWR<
    ApiResponsePayload<RouteOutput[]>
  >("/api/routes", fetcher);

  React.useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, ...(deps ?? [])]);

  return {
    routes: data?.data,
    error: error || data?.error,
    isLoading: isLoading || data === undefined || data.data === null,
  };
}

// Mendapatkan code selanjutnya dari route yang akan ditambah
export function useNextRouteCode(deps?: React.DependencyList) {
  const { data, error, isLoading, mutate } = useSWR<ApiResponsePayload<string>>(
    "/api/routes/next",
    fetcher
  );

  React.useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, ...(deps ?? [])]);

  return {
    code: data?.data,
    error: error || data?.error,
    isLoading: isLoading || data === undefined || data.data === null,
  };
}

// Menghapus route
export async function deleteRoute(code: string) {
  await fetch(`/api/routes/${code}`, {
    method: "DELETE",
  });
}
