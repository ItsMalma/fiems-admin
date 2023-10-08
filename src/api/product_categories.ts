import React from "react";
import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";
import { ApiResponsePayload } from "@/libs/utils";
import {
  ProductCategoryOutput,
  SaveProductCategoryInput,
} from "@/models/productCategory.model";

// Buat dan tambah product category baru
export async function createProductCategory(input: SaveProductCategoryInput) {
  await fetch("/api/product_categories", {
    method: "POST",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Ubah (update) product category
export async function updateProductCategory(
  reff: string,
  input: SaveProductCategoryInput
) {
  await fetch(`/api/product_categories/${reff}`, {
    method: "PUT",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Mendapatkan semua product category
export function useProductCategories(deps?: React.DependencyList) {
  const { data, error, isLoading, mutate } = useSWR<
    ApiResponsePayload<ProductCategoryOutput[]>
  >("/api/product_categories", fetcher);

  React.useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, ...(deps ?? [])]);

  return {
    productCategories: data?.data,
    error: error || data?.error,
    isLoading: isLoading || data === undefined || data.data === null,
  };
}

// Mendapatkan reff selanjutnya dari product category yang akan ditambah
export function useNextProductCategoryReff(deps?: React.DependencyList) {
  const { data, error, isLoading, mutate } = useSWR<ApiResponsePayload<string>>(
    "/api/product_categories/next",
    fetcher
  );

  React.useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, ...(deps ?? [])]);

  return {
    reff: data?.data,
    error: error || data?.error,
    isLoading: isLoading || data === undefined || data.data === null,
  };
}

// Menghapus product category
export async function deleteProductCategory(reff: string) {
  await fetch(`/api/product_categories/${reff}`, {
    method: "DELETE",
  });
}
