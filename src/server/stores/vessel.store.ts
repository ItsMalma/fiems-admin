import { Vessel } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  VesselInput,
} from "../dtos/vessel.dto";
import prisma from "../prisma";

export async function findAllVessel() {
  return await prisma.vessel.findMany({
    include: {
        shipping: true,
    }
  });
}

export async function findVesselById(id: string) {
  const vessel = await prisma.vessel.findFirst({ 
    where: { id }, 
    include: { shipping: true }
  });
  if (!vessel) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Vessel with id ${id} not exists`,
    });
  }

  return vessel;
}

export async function createVessel(
  input: VesselInput
): Promise<Vessel> {

	if (input.shipping === undefined) {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "Invalid vendor code",
		});
	}
  return await prisma.vessel.create({
    data: {
      shipping: { connect: { code: input.shipping } },
      name: input.name,
      capacity: input.capacity,
      unit: input.unit,
      status: false
    },
  });
}

export async function updateVessel(
  id: string,
  input: VesselInput
): Promise<Vessel> {
  return await prisma.vessel.update({
    where: {
      id,
    },
    data: {
        name: input.name,
        capacity: input.capacity,
        unit: input.unit
    },
  });
}

export async function deleteVessel(id: string): Promise<Vessel> {
  return await prisma.vessel.delete({ where: { id } });
}
