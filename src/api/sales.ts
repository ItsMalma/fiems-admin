import React from "react";
import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";
import { ApiResponsePayload } from "@/libs/utils";
import { SaveSalesInput, SalesOutput } from "@/models/sales.model";

// Buat dan tambah sales baru
export async function createSales(input: SaveSalesInput) {
  const res = await fetch("/api/sales", {
    method: "POST",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await res.json()) as ApiResponsePayload<SalesOutput>;
}

// Ubah (update) sales
export async function updateSales(code: string, input: SaveSalesInput) {
  const res = await fetch(`/api/sales/${code}`, {
    method: "PUT",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await res.json()) as ApiResponsePayload<SalesOutput>;
}

// Mendapatkan semua sales
export function useListSales(deps?: React.DependencyList) {
  const { data, error, isLoading, mutate } = useSWR<
    ApiResponsePayload<SalesOutput[]>
  >("/api/sales", fetcher);

  React.useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, ...(deps ?? [])]);

  return {
    listSales: data?.data,
    error: error || data?.error,
    isLoading: isLoading || data === undefined || data.data === null,
  };
}

// Mendapatkan sales berdasarkan code
export function useSales(code: string | null, deps?: React.DependencyList) {
  const { data, error, isLoading, mutate } = useSWR<
    ApiResponsePayload<SalesOutput>
  >(code ? `/api/sales/${code}` : null, fetcher);

  React.useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, ...(deps ?? [])]);

  return {
    sales: data?.data,
    error: error || data?.error,
    isLoading: isLoading || data === undefined || data.data === null,
  };
}

// Menghapus sales group
export async function deleteSales(code: string) {
  await fetch(`/api/sales/${code}`, {
    method: "DELETE",
  });
}
