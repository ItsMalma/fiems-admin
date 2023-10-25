import { Product, ProductType } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  ProductInput,
  createProductSKUCode,
  extractProductSKUCode,
} from "../dtos/product.dto";
import prisma from "../prisma";

export async function findAllProduct() {
  return await prisma.product.findMany({ include: { productCategory: true } });
}

export async function findProductBySKUCode(skuCode: string) {
  const product = await prisma.product.findFirst({
    where: { skuCode },
    include: { productCategory: true },
  });
  if (!product) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Product category with sku code ${skuCode} not exists`,
    });
  }

  return product;
}

export async function findNextProductSKUCode() {
  const nextProduct = await prisma.product.findFirst({
    orderBy: {
      skuCode: "desc",
    },
  });

  if (nextProduct) {
    return createProductSKUCode(extractProductSKUCode(nextProduct.skuCode) + 1);
  } else {
    return createProductSKUCode(1);
  }
}

export async function createProduct(
  skuCode: string,
  input: ProductInput
): Promise<Product> {
  return await prisma.product.create({
    data: {
      skuCode,
      type: input.type as ProductType,
      productCategory: {
        connect: {
          reff: input.category,
        },
      },
      name: input.name,
      unit: input.unit,
    },
  });
}

export async function updateProduct(
  skuCode: string,
  input: ProductInput
): Promise<Product> {
  return await prisma.product.update({
    where: {
      skuCode,
    },
    data: {
      type: input.type as ProductType,
      productCategory: {
        connect: {
          reff: input.category,
        },
      },
      name: input.name,
      unit: input.unit,
    },
  });
}

export async function deleteProduct(skuCode: string): Promise<Product> {
  return await prisma.product.delete({ where: { skuCode } });
}
