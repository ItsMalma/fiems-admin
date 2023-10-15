import { fetcher } from "@/libs/fetcher";
import { ApiResponsePayload } from "@/libs/utils";
import { COAOutput, MainCOAOutput, SaveCOAInput } from "@/models/coa.model";
import React from "react";
import useSWR from "swr";

// Buat dan tambah coa baru
export async function createCOA(input: SaveCOAInput) {
  const res = await fetch("/api/coas", {
    method: "POST",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await res.json()) as ApiResponsePayload<MainCOAOutput>;
}

// Ubah (update) coa
export async function updateCOA(accountNumber: string, input: SaveCOAInput) {
  const res = await fetch(`/api/coas/${accountNumber}`, {
    method: "PUT",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await res.json()) as ApiResponsePayload<MainCOAOutput>;
}

// Mendapatkan semua coa
export function useCOAs(deps?: React.DependencyList) {
  const { data, error, isLoading, mutate } = useSWR<
    ApiResponsePayload<MainCOAOutput[]>
  >("/api/coas", fetcher);

  React.useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, ...(deps ?? [])]);

  return {
    coas: data?.data,
    error: error || data?.error,
    isLoading: isLoading || data === undefined || data.data === null,
  };
}

// Mendapatkan coa berdasarkan account number
export function useMainCOA(
  mainNumber: number | null,
  deps?: React.DependencyList
) {
  const { data, error, isLoading, mutate } = useSWR<
    ApiResponsePayload<MainCOAOutput>
  >(mainNumber ? `/api/coas/${mainNumber}` : null, fetcher);

  React.useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, ...(deps ?? [])]);

  return {
    coa: data?.data,
    error: error || data?.error,
    isLoading: isLoading || data === undefined || data.data === null,
  };
}

// Mendapatkan coa berdasarkan account number
export function useCOA(
  accountNumber: string | null,
  deps?: React.DependencyList
) {
  const { data, error, isLoading, mutate } = useSWR<
    ApiResponsePayload<COAOutput>
  >(accountNumber ? `/api/coas/${accountNumber}?simple=true` : null, fetcher);

  React.useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, ...(deps ?? [])]);

  return {
    coa: data?.data,
    error: error || data?.error,
    isLoading: isLoading || data === undefined || data.data === null,
  };
}

// Mendapatkan account number selanjutnya dari coa yang akan ditambah
export function useNextCOANumber(deps?: React.DependencyList) {
  const { data, error, isLoading, mutate } = useSWR<ApiResponsePayload<string>>(
    "/api/coas/next",
    fetcher
  );

  React.useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, ...(deps ?? [])]);

  return {
    nextNumber: data?.data,
    error: error || data?.error,
    isLoading: isLoading || data === undefined || data.data === null,
  };
}

// Menghapus coa
export async function deleteCOA(accountNumber: string) {
  await fetch(`/api/coas/${accountNumber}`, {
    method: "DELETE",
  });
}
