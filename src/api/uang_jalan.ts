import React from "react";
import { SaveUangJalanInput, UangJalanOutput } from "@/models/uangJalan.model";
import { ApiResponsePayload } from "@/libs/utils";
import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";

// Buat dan tambah uang jalan baru
export async function createUangJalan(input: SaveUangJalanInput) {
  const res = await fetch("/api/uang_jalan", {
    method: "POST",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await res.json()) as ApiResponsePayload<UangJalanOutput>;
}

// Ubah (update) uang jalan
export async function updateUangJalan(id: number, input: SaveUangJalanInput) {
  const res = await fetch(`/api/uang_jalan/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await res.json()) as ApiResponsePayload<UangJalanOutput>;
}

// Mendapatkan semua uang jalan
export function useListUangJalan(deps?: React.DependencyList) {
  const { data, error, isLoading, mutate } = useSWR<
    ApiResponsePayload<UangJalanOutput[]>
  >("/api/uang_jalan", fetcher);

  React.useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, ...(deps ?? [])]);

  return {
    listUangJalan: data?.data,
    error: error || data?.error,
    isLoading: isLoading || data === undefined || data.data === null,
  };
}

// Mendapatkan uang jalan berdasarkan code
export function useUangJalan(id: number | null, deps?: React.DependencyList) {
  const { data, error, isLoading, mutate } = useSWR<
    ApiResponsePayload<UangJalanOutput>
  >(id ? `/api/uang_jalan/${id}` : null, fetcher);

  React.useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, ...(deps ?? [])]);

  return {
    uangJalan: data?.data,
    error: error || data?.error,
    isLoading: isLoading || data === undefined || data.data === null,
  };
}

// Menghapus uang jalan
export async function deleteUangJalan(id: number) {
  await fetch(`/api/uang_jalan/${id}`, {
    method: "DELETE",
  });
}
