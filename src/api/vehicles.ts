import React from "react";
import { SaveVehicleInput, VehicleOutput } from "@/models/vehicle.model";
import { ApiResponsePayload } from "@/libs/utils";
import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";

// Buat dan tambah vehicle baru
export async function createVehicle(input: SaveVehicleInput) {
  const res = await fetch("/api/vehicles", {
    method: "POST",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await res.json()) as ApiResponsePayload<VehicleOutput>;
}

// Ubah (update) vehicle
export async function updateVehicle(number: string, input: SaveVehicleInput) {
  const res = await fetch(`/api/vehicles/${number}`, {
    method: "PUT",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await res.json()) as ApiResponsePayload<VehicleOutput>;
}

// Mendapatkan semua vehicle
export function useVehicles(deps?: React.DependencyList) {
  const { data, error, isLoading, mutate } = useSWR<
    ApiResponsePayload<VehicleOutput[]>
  >("/api/vehicles", fetcher);

  React.useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, ...(deps ?? [])]);

  return {
    vehicles: data?.data,
    error: error || data?.error,
    isLoading: isLoading || data === undefined || data.data === null,
  };
}

// Mendapatkan vehicle berdasarkan code
export function useVehicle(number: string | null, deps?: React.DependencyList) {
  const { data, error, isLoading, mutate } = useSWR<
    ApiResponsePayload<VehicleOutput>
  >(number ? `/api/vehicles/${number}` : null, fetcher);

  React.useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, ...(deps ?? [])]);

  return {
    vehicle: data?.data,
    error: error || data?.error,
    isLoading: isLoading || data === undefined || data.data === null,
  };
}

// Menghapus vehicle group
export async function deleteVehicle(code: string) {
  await fetch(`/api/vehicles/${code}`, {
    method: "DELETE",
  });
}
