import React from "react";
import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";
import { ApiResponsePayload } from "@/libs/utils";
import {
  CustomerGroupOutput,
  SaveCustomerGroupInput,
} from "@/models/customerGroup.model";

// Buat dan tambah customer group baru
export async function createCustomerGroup(input: SaveCustomerGroupInput) {
  await fetch("/api/customer_groups", {
    method: "POST",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Ubah (update) customer group
export async function updateCustomerGroup(
  code: string,
  input: SaveCustomerGroupInput
) {
  await fetch(`/api/customer_groups/${code}`, {
    method: "PUT",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Mendapatkan semua customer group
export function useCustomerGroups(deps?: React.DependencyList) {
  const { data, error, isLoading, mutate } = useSWR<
    ApiResponsePayload<CustomerGroupOutput[]>
  >("/api/customer_groups", fetcher);

  React.useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, ...(deps ?? [])]);

  return {
    groups: data?.data,
    error: error || data?.error,
    isLoading: isLoading || data === undefined || data.data === null,
  };
}

// Mendapatkan code selanjutnya dari customer group yang akan ditambah
export function useNextCustomerGroupCode(deps?: React.DependencyList) {
  const { data, error, isLoading, mutate } = useSWR<ApiResponsePayload<string>>(
    "/api/customer_groups/next",
    fetcher
  );

  React.useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, ...(deps ?? [])]);

  if (isLoading || data === undefined || data.data === null) {
    return {
      groups: undefined,
      error: error,
      isLoading: true,
    };
  }

  return {
    code: data?.data,
    error: error || data?.error,
    isLoading: isLoading || data === undefined || data.data === null,
  };
}

// Menghapus customer group
export async function deleteCustomerGroup(code: string) {
  await fetch(`/api/customer_groups/${code}`, {
    method: "DELETE",
  });
}
