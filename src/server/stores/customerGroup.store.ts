import {
  CustomerGroupInput,
  createCustomerGroupCode,
  extractCustomerGroupCode,
} from "@/server/dtos/customerGroup.dto";
import { CustomerGroup } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import prisma from "../prisma";

export async function findAllCustomerGroup(): Promise<CustomerGroup[]> {
  return await prisma.customerGroup.findMany();
}

export async function findCustomerGroupByCode(
  code: string
): Promise<CustomerGroup> {
  const customerGroup = await prisma.customerGroup.findFirst({
    where: { code },
  });
  if (!customerGroup) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Customer Group with code ${code} not exists`,
    });
  }

  return customerGroup;
}

export const findNextCustomerGroupCode = async (): Promise<string> => {
  const nextCustomerGroup = await prisma.customerGroup.findFirst({
    orderBy: {
      code: "desc",
    },
  });

  if (!nextCustomerGroup) {
    return createCustomerGroupCode(1);
  }

  const extractedCustomerGroupCode = extractCustomerGroupCode(
    nextCustomerGroup.code
  );
  if (isNaN(extractedCustomerGroupCode)) {
    throw new TRPCError({
      code: "PARSE_ERROR",
      message: "Latest customer group's code is invalid",
    });
  }

  return createCustomerGroupCode(extractedCustomerGroupCode + 1);
};

export async function createCustomerGroup(
  code: string,
  input: CustomerGroupInput
): Promise<CustomerGroup> {
  return await prisma.customerGroup.create({
    data: {
      code,
      name: input.name,
      description: input.description,
    },
  });
}

export async function updateCustomerGroup(
  code: string,
  input: CustomerGroupInput
): Promise<CustomerGroup> {
  return await prisma.customerGroup.update({
    where: {
      code,
    },
    data: {
      name: input.name,
      description: input.description,
    },
  });
}

export async function deleteCustomerGroup(
  code: string
): Promise<CustomerGroup> {
  return await prisma.customerGroup.delete({ where: { code } });
}
