import React from "react";
import { SaveVesselInput, VesselOutput } from "@/models/vessel.model";
import { ApiResponsePayload } from "@/libs/utils";
import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";

// Buat dan tambah vessel baru
export async function createVessel(input: SaveVesselInput) {
  const res = await fetch("/api/vessels", {
    method: "POST",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await res.json()) as ApiResponsePayload<VesselOutput>;
}

// Ubah (update) vessel
export async function updateVessel(id: number, input: SaveVesselInput) {
  const res = await fetch(`/api/vessels/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await res.json()) as ApiResponsePayload<VesselOutput>;
}

// Mendapatkan semua vessel
export function useVessels(deps?: React.DependencyList) {
  const { data, error, isLoading, mutate } = useSWR<
    ApiResponsePayload<VesselOutput[]>
  >("/api/vessels", fetcher);

  React.useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, ...(deps ?? [])]);

  return {
    vessels: data?.data,
    error: error || data?.error,
    isLoading: isLoading || data === undefined || data.data === null,
  };
}

// Mendapatkan vessel berdasarkan code
export function useVessel(id: number | null, deps?: React.DependencyList) {
  const { data, error, isLoading, mutate } = useSWR<
    ApiResponsePayload<VesselOutput>
  >(id ? `/api/vessels/${id}` : null, fetcher);

  React.useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, ...(deps ?? [])]);

  return {
    vessel: data?.data,
    error: error || data?.error,
    isLoading: isLoading || data === undefined || data.data === null,
  };
}

// Menghapus vessel group
export async function deleteVessel(id: number) {
  await fetch(`/api/vessels/${id}`, {
    method: "DELETE",
  });
}
