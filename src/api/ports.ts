import React from "react";
import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";
import { ApiResponsePayload } from "@/libs/utils";
import { PortOutput, SavePortInput } from "@/models/port.model";

// Buat dan tambah port baru
export async function createPort(input: SavePortInput) {
  await fetch("/api/ports", {
    method: "POST",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Ubah (update) port
export async function updatePort(code: string, input: SavePortInput) {
  await fetch(`/api/ports/${code}`, {
    method: "PUT",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Mendapatkan semua port
export function usePorts(deps?: React.DependencyList) {
  const { data, error, isLoading, mutate } = useSWR<
    ApiResponsePayload<PortOutput[]>
  >("/api/ports", fetcher);

  React.useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, ...(deps ?? [])]);

  return {
    ports: data?.data,
    error: error || data?.error,
    isLoading: isLoading || data === undefined || data.data === null,
  };
}

// Mendapatkan code selanjutnya dari port yang akan ditambah
export function useNextPortCode(deps?: React.DependencyList) {
  const { data, error, isLoading, mutate } = useSWR<ApiResponsePayload<string>>(
    "/api/ports/next",
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

// Menghapus port
export async function deletePort(code: string) {
  await fetch(`/api/ports/${code}`, {
    method: "DELETE",
  });
}
