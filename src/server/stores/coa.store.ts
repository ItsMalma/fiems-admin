import { Coa, Coa1, Coa2 } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  AccountType,
  CoaInput,
  createCoaCode,
  extractCoaCode,
} from "../dtos/coa.dto";
import prisma from "../prisma";

export async function findAllMainCoa() {
  return await prisma.coa.findMany();
}
export async function findAllSubCoa1() {
  return await prisma.coa1.findMany({
    include: {
      coa: true
    }
  });
}
export async function findAllSubCoa2() {
  return await prisma.coa2.findMany({
    include: {
      coa1: {include: {
        coa: true
      }}
    }
  });
}

export async function findMainCoaByNumber(number: string) {
  const coa = await prisma.coa.findFirst({ where: { number } });
  if (!coa) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Main Coa with number ${number} not exists`,
    });
  }

  return coa;
}

export async function findSubCoa1ByNumber(number: string) {
  const coa1 = await prisma.coa1.findFirst({ where: { number }, include: {coa: true} });
  if (!coa1) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Sub Coa1 with number ${number} not exists`,
    });
  }

  return coa1;
}

export async function findSubCoa2ByNumber(number: string) {
  const coa2 = await prisma.coa2.findFirst({ where: { number }, include: {coa1: {include: {coa: true}}} });
  if (!coa2) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Sub Coa1 with number ${number} not exists`,
    });
  }

  return coa2;
}

export async function findNextMainCoaCode() {
  const nextCoa = await prisma.coa.findFirst({
    orderBy: {
      number: "desc",
    },
  });

  if (nextCoa) {
    return createCoaCode(extractCoaCode(nextCoa.number) + 1);
  } else {
    return createCoaCode(1);
  }
}

export async function findNextSubCoa1Code() {
  const nextCoa = await prisma.coa1.findFirst({
    orderBy: {
      number: "desc",
    },
  });

  if (nextCoa) {
    return createCoaCode(extractCoaCode(nextCoa.number) + 1);
  } else {
    return createCoaCode(1);
  }
}

export async function findNextSubCoa2Code() {
  const nextCoa = await prisma.coa2.findFirst({
    orderBy: {
      number: "desc",
    },
  });

  if (nextCoa) {
    return createCoaCode(extractCoaCode(nextCoa.number) + 1);
  } else {
    return createCoaCode(1);
  }
}


export async function createMainCoa(
  type: AccountType,
  number: string,
  input: CoaInput
): Promise<Coa | Coa1 | Coa2> {
  switch(type) {
    case "Main Coa":
      return await prisma.coa.create({
        data: {
          number,
          description: input.description,
          type: input.type,
          category: input.category,
          transaction: input.transaction,
          currency: input.currency,
          status: false
        },
      });
      case "Sub Coa 1":

      if (input.mainCoa === undefined) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid main coa number",
        });
      }

        return await prisma.coa1.create({
          data: {
            number,
            coa: { connect: {number: input.mainCoa} },
            description: input.description,
          },
        });
      case "Sub Coa 2":

      if (input.subCoa1 === undefined) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid sub coa number",
        });
      }

        return await prisma.coa2.create({
          data: {
            number,
            coa1: { connect: {number: input.subCoa1} },
            description: input.description,
          },
        });
  }
}

export async function updateCoa(
  type: AccountType,
  number: string,
  input: CoaInput
): Promise<Coa | Coa1 | Coa2> {

  switch(type) {
    case "Main Coa":
      return await prisma.coa.update({
        where: {
          number,
        },
        data: {
          description: input.description,
          type: input.type,
          category: input.category,
          transaction: input.transaction,
          currency: input.currency,
        },
      });
      case "Sub Coa 1":

      if (input.mainCoa === undefined) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid main coa number",
        });
      }

        return await prisma.coa1.update({
          where: {
            number,
          },
          data: {
            coa: { connect: {number: input.mainCoa} },
            description: input.description,
          },
        });
      case "Sub Coa 2":

      if (input.subCoa1 === undefined) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid sub coa number",
        });
      }

        return await prisma.coa2.update({
          where: {
            number,
          },
          data: {
            coa1: { connect: {number: input.subCoa1} },
            description: input.description,
          },
        });
  }
}

export async function deleteCoa(
  type: AccountType,
  number: string
): Promise<Coa | Coa1 | Coa2> {
  switch (type) {
    case "Main Coa":
      return await prisma.coa.delete({ where: { number } });
    case "Sub Coa 1":
      return await prisma.coa1.delete({ where: { number } });
    case "Sub Coa 2":
      return await prisma.coa2.delete({ where: { number } });
  }
}
