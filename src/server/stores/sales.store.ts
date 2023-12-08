import { Sales, SalesJobPosition } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  SalesInput,
  createSalesCode,
  extractSalesCode,
} from "../dtos/sales.dto";
import prisma from "../prisma";

export async function findAllSales(onlyActive: boolean = false) {
  return await prisma.sales.findMany({
    where: { status: onlyActive ? true : {} },
  });
}

export async function findSalesByCode(code: string) {
  const sales = await prisma.sales.findFirst({
    where: { code },
    include: {
      inquiries: true,
      quotations: true,
    },
  });
  if (!sales) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Sales with code ${code} not exists`,
    });
  }

  return sales;
}

export async function findNextSalesCode() {
  const nextSales = await prisma.sales.findFirst({
    orderBy: {
      code: "desc",
    },
  });

  if (nextSales) {
    return createSalesCode(extractSalesCode(nextSales.code) + 1);
  } else {
    return createSalesCode(1);
  }
}

export async function createSales(
  code: string,
  input: SalesInput
): Promise<Sales> {
  return await prisma.sales.create({
    data: {
      code,
      name: input.name,
      jobPosition: input.jobPosition as SalesJobPosition,
      nik: input.nik,
      area: input.area,
      phoneNumber: input.phoneNumber,
      telephone: input.telephone,
      fax: input.fax,
      email: input.email,
    },
  });
}

export async function updateSales(
  code: string,
  input: SalesInput
): Promise<Sales> {
  return await prisma.sales.update({
    where: {
      code,
    },
    data: {
      name: input.name,
      jobPosition: input.jobPosition as SalesJobPosition,
      nik: input.nik,
      area: input.area,
      phoneNumber: input.phoneNumber,
      telephone: input.telephone,
      fax: input.fax,
      email: input.email,
    },
  });
}

export async function deleteSales(code: string): Promise<Sales> {
  const sales = await findSalesByCode(code);

  if (sales.quotations.length > 0)
    throw new TRPCError({
      code: "CONFLICT",
      message: `Sales ${sales.code} is used in Quotation ${sales.quotations[0].number}`,
    });
  if (sales.inquiries.length > 0)
    throw new TRPCError({
      code: "CONFLICT",
      message: `Sales ${sales.code} is used in Inquiry ${sales.inquiries[0].number}`,
    });

  return await prisma.sales.delete({ where: { code: sales.code } });
}
