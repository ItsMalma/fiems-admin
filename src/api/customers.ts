import React from "react";
import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";
import { ApiResponsePayload } from "@/libs/utils";
import { SaveCustomerInput, CustomerOutput } from "@/models/customer.model";

// Buat dan tambah customer baru
export async function createCustomer(input: SaveCustomerInput) {
  const res = await fetch("/api/customers", {
    method: "POST",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await res.json()) as ApiResponsePayload<CustomerOutput>;
}

// Ubah (update) customer
export async function updateCustomer(code: string, input: SaveCustomerInput) {
  const res = await fetch(`/api/customers/${code}`, {
    method: "PUT",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await res.json()) as ApiResponsePayload<CustomerOutput>;
}

// Mendapatkan semua customer
export function useCustomers(deps?: React.DependencyList) {
  const { data, error, isLoading, mutate } = useSWR<
    ApiResponsePayload<CustomerOutput[]>
  >("/api/customers", fetcher);

  React.useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, ...(deps ?? [])]);

  return {
    customers: data?.data,
    error: error || data?.error,
    isLoading: isLoading || data === undefined || data.data === null,
  };
}

// Mendapatkan customer berdasarkan code
export function useCustomer(code: string | null, deps?: React.DependencyList) {
  const { data, error, isLoading, mutate } = useSWR<
    ApiResponsePayload<CustomerOutput>
  >(code ? `/api/customers/${code}` : null, fetcher);

  React.useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, ...(deps ?? [])]);

  return {
    customer: data?.data,
    error: error || data?.error,
    isLoading: isLoading || data === undefined || data.data === null,
  };
}

// Menghapus customer group
export async function deleteCustomer(code: string) {
  await fetch(`/api/customers/${code}`, {
    method: "DELETE",
  });
}
