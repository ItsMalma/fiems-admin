import { ProductCategory } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  ProductCategoryInput,
  createProductCategoryReff,
  extractProductCategoryReff,
} from "../dtos/productCategory.dto";
import prisma from "../prisma";

export async function findAllProductCategory() {
  return await prisma.productCategory.findMany();
}

export async function findProductCategoryByReff(reff: string) {
  const productCategory = await prisma.productCategory.findFirst({
    where: { reff },
    include: { products: true },
  });
  if (!productCategory) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Product category with reff ${reff} not exists`,
    });
  }

  return productCategory;
}

export async function findNextProductCategoryReff() {
  const nextProductCategory = await prisma.productCategory.findFirst({
    orderBy: {
      reff: "desc",
    },
  });

  if (nextProductCategory) {
    return createProductCategoryReff(
      extractProductCategoryReff(nextProductCategory.reff) + 1
    );
  } else {
    return createProductCategoryReff(1);
  }
}

export async function createProductCategory(
  reff: string,
  input: ProductCategoryInput
): Promise<ProductCategory> {
  return await prisma.productCategory.create({
    data: {
      reff,
      name: input.name,
    },
  });
}

export async function updateProductCategory(
  reff: string,
  input: ProductCategoryInput
): Promise<ProductCategory> {
  return await prisma.productCategory.update({
    where: {
      reff,
    },
    data: {
      name: input.name,
    },
  });
}

export async function deleteProductCategory(
  reff: string
): Promise<ProductCategory> {
  const productCategory = await findProductCategoryByReff(reff);

  if (productCategory.products.length > 0)
    throw new TRPCError({
      code: "CONFLICT",
      message: `Product Category ${productCategory.reff} is used in Product ${productCategory.products[0].skuCode}`,
    });

  return await prisma.productCategory.delete({
    where: { reff: productCategory.reff },
  });
}
