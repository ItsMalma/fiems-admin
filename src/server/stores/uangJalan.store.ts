import { UangJalan } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { UangJalanInput } from "../dtos/uangJalan.dto";
import prisma from "../prisma";

export async function findAllUangJalan() {
  return await prisma.uangJalan.findMany({
    include: {
      priceVendorDetail: {
        include: {
          route: true,
          priceVendor: {
            include: {
              vendor: true,
            },
          },
        },
      },
    },
  });
}

export async function findUangJalanById(id: string) {
  const uangJalan = await prisma.uangJalan.findFirst({
    where: { id },
    include: {
      priceVendorDetail: {
        include: {
          route: true,
          priceVendor: {
            include: {
              vendor: true,
            },
          },
        },
      },
    },
  });
  if (!uangJalan) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Uang Jalan with id ${id} not exists`,
    });
  }

  return uangJalan;
}

export async function createUangJalan(
  input: UangJalanInput
): Promise<UangJalan> {
  const priceVendorDetail = await prisma.priceVendorDetail.findFirst({
    where: {
      priceVendor: { vendor: { code: input.vendor } },
      route: { code: input.route },
    },
  });
  if (!priceVendorDetail) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Price vendor with vendor ${input.vendor} and route ${input.route} not found`,
    });
  }

  return await prisma.uangJalan.create({
    data: {
      priceVendorDetail: { connect: { id: priceVendorDetail.id } },
      truckType: input.truckType,
      containerSize: input.containerSize,
      bbm: input.bbm,
      toll: input.toll,
      labourCost: input.labourCost,
      meal: input.meal,
      etc: input.etc,
      total: input.total,
    },
  });
}

export async function updateUangJalan(
  id: string,
  input: UangJalanInput
): Promise<UangJalan> {
  const priceVendorDetail = await prisma.priceVendorDetail.findFirst({
    where: {
      priceVendor: { vendor: { code: input.vendor } },
      route: { code: input.route },
    },
  });
  if (!priceVendorDetail) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Price vendor with vendor ${input.vendor} and route ${input.route} not found`,
    });
  }

  return await prisma.uangJalan.update({
    where: {
      id,
    },
    data: {
      priceVendorDetail: { connect: { id: priceVendorDetail.id } },
      truckType: input.truckType,
      containerSize: input.containerSize,
      bbm: input.bbm,
      toll: input.toll,
      labourCost: input.labourCost,
      meal: input.meal,
      etc: input.etc,
      total: input.total,
    },
  });
}

export async function deleteUangJalan(id: string): Promise<UangJalan> {
  return await prisma.uangJalan.delete({ where: { id } });
}
