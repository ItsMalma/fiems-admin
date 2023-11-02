import { TRPCError } from "@trpc/server";
import { MainCOAInput } from "../dtos/coa.dto";
import prisma from "../prisma";

export async function findAllCOA() {
  return await prisma.mainCOA.findMany();
}

export async function findCOAByNumber(number: number) {
  const coa = await prisma.mainCOA.findFirst({ where: { number } });
  if (!coa) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Main COA with number ${number} not exists`,
    });
  }

  return coa;
}

export async function findNextCOANumber() {
  const nextCOA = await prisma.mainCOA.findFirst({
    orderBy: {
      number: "desc",
    },
  });

  if (nextCOA) {
    return nextCOA.number + 1;
  } else {
    return 100;
  }
}

export async function createCOA(number: number, input: MainCOAInput) {
  return await prisma.mainCOA.create({
    data: {
      number,
      accountName: input.accountName,
      accountType: input.accountType,
      category: input.category,
      transaction: input.transaction,
      currency: input.currency,
      status: true,
      subs: [],
    },
  });
}

export async function updateCOA(number: number, input: MainCOAInput) {
  return await prisma.mainCOA.update({
    where: {
      number,
    },
    data: {
      accountName: input.accountName,
      accountType: input.accountType,
      category: input.category,
      transaction: input.transaction,
      currency: input.currency,
      status: true,
      subs: [],
    },
  });
}

export async function deleteCOA(number: number) {
  return await prisma.mainCOA.delete({ where: { number } });
}
