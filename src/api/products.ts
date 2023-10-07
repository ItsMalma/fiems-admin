import React from "react";
import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";
import { ApiResponsePayload } from "@/libs/utils";
import { SaveProductInput, ProductOutput } from "@/models/product.model";

// Buat dan tambah product baru
export async function createProduct(input: SaveProductInput) {
  const res = await fetch("/api/products", {
    method: "POST",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await res.json()) as ApiResponsePayload<ProductOutput>;
}

// Ubah (update) product
export async function updateProduct(skuCode: string, input: SaveProductInput) {
  const res = await fetch(`/api/products/${skuCode}`, {
    method: "PUT",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await res.json()) as ApiResponsePayload<ProductOutput>;
}

// Mendapatkan semua product
export function useProducts(deps?: React.DependencyList) {
  const { data, error, isLoading, mutate } = useSWR<
    ApiResponsePayload<ProductOutput[]>
  >("/api/products", fetcher);

  React.useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, ...(deps ?? [])]);

  return {
    products: data?.data,
    error: error || data?.error,
    isLoading: isLoading || data === undefined || data.data === null,
  };
}

// Mendapatkan product berdasarkan sku code
export function useProduct(
  skuCode: string | null,
  deps?: React.DependencyList
) {
  const { data, error, isLoading, mutate } = useSWR<
    ApiResponsePayload<ProductOutput>
  >(skuCode ? `/api/products/${skuCode}` : null, fetcher);

  React.useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, ...(deps ?? [])]);

  return {
    product: data?.data,
    error: error || data?.error,
    isLoading: isLoading || data === undefined || data.data === null,
  };
}

// Mendapatkan sku code selanjutnya dari product yang akan ditambah
export function useNextProductSKUCode(deps?: React.DependencyList) {
  const { data, error, isLoading, mutate } = useSWR<ApiResponsePayload<string>>(
    "/api/products/next",
    fetcher
  );

  React.useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, ...(deps ?? [])]);

  return {
    skuCode: data?.data,
    error: error || data?.error,
    isLoading: isLoading || data === undefined || data.data === null,
  };
}

// Menghapus product
export async function deleteProduct(skuCode: string) {
  await fetch(`/api/products/${skuCode}`, {
    method: "DELETE",
  });
}
