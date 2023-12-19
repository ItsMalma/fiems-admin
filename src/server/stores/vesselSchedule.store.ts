import prisma from "@/server/prisma";
import { TRPCError } from "@trpc/server";
import { VesselScheduleInput } from "../dtos/vesselSchedule.dto";

export async function findVesselScheduleByID(id: string) {
  const vesselSchedule = await prisma.vesselSchedule.findFirst({
    where: { id },
    include: {
      shipping: true,
      vessel: true,
      portOrigin: true,
      portDestination: true,
    },
  });
  if (!vesselSchedule) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Vessel schedule with id ${id} not exists`,
    });
  }

  return vesselSchedule;
}

export async function findAllVesselSchedule(onlyActive = false) {
  return await prisma.vesselSchedule.findMany({
    include: {
      shipping: true,
      vessel: true,
      portOrigin: true,
      portDestination: true,
    },
    where: onlyActive
      ? {
          eta: {
            lte: new Date(),
          },
          etd: {
            gte: new Date(),
          },
        }
      : {},
  });
}

export async function createVesselSchedule(input: VesselScheduleInput) {
  return await prisma.vesselSchedule.create({
    data: {
      month: input.month,
      shipping: { connect: { code: input.shipping } },
      vessel: { connect: { id: input.vessel } },
      voyage: input.voyage,
      quota: input.quota,
      portOrigin: { connect: { code: input.portOrigin } },
      portDestination: { connect: { code: input.portDestination } },
      openStackDate: input.openStackDate,
      closingRC: input.closingRC,
      rcClosingTime: input.rcClosingTime,
      closingDate: input.closingDate,
      vesselClosingTime: input.vesselClosingTime,
      etd: input.etd,
      eta: input.eta,
    },
  });
}

export async function updateVesselSchedule(
  id: string,
  input: VesselScheduleInput
) {
  return await prisma.vesselSchedule.update({
    where: {
      id,
    },
    data: {
      month: input.month,
      shipping: { connect: { code: input.shipping } },
      vessel: { connect: { id: input.vessel } },
      voyage: input.voyage,
      quota: input.quota,
      portOrigin: { connect: { code: input.portOrigin } },
      portDestination: { connect: { code: input.portDestination } },
      openStackDate: input.openStackDate,
      closingRC: input.closingRC,
      rcClosingTime: input.rcClosingTime,
      closingDate: input.closingDate,
      vesselClosingTime: input.vesselClosingTime,
      etd: input.etd,
      eta: input.eta,
    },
  });
}

export async function deleteVesselSchedule(id: string) {
  const vesselSchedule = await findVesselScheduleByID(id);

  return await prisma.vesselSchedule.delete({
    where: { id: vesselSchedule?.id },
  });
}
