import { Vehicle } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  VehicleInput,
} from "../dtos/vehicle.dto";
import prisma from "../prisma";
import { findVendorByCode } from "./customer.store";

export async function findAllVehicle() {
  return await prisma.vehicle.findMany({
    include: {
        vendor: true
    }
  });
}

export async function findVehicleById(id: string) {
  const vehicle = await prisma.vehicle.findFirst({ where: { id } });
  if (!vehicle) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Vehicle with id ${id} not exists`,
    });
  }

  return vehicle;
}

export async function createVehicle(
  id: string,
  input: VehicleInput
): Promise<Vehicle> {

	if (input.vendorName === undefined) {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "Invalid vendor code",
		});
	}

	const vendor = findVendorByCode(input.vendorName)

  return await prisma.vehicle.create({
    data: {
      id,
      vendorName: { connect: { code: vendor.code } },
      truckNumber: input.truckNumber,
      brand: input.brand,
      type: input.type,
      machineNumber: input.machineNumber,
      frameNumber: input.frameNumber,
      cylinder: input.cylinder,
      color: input.color,
      stnkExpired: input.stnkExpired,
      taxExpired: input.taxExpired,
      keurExpired: input.keurExpired,
    },
  });
}

export async function updateVehicle(
  id: string,
  input: VehicleInput
): Promise<Vehicle> {
  return await prisma.vehicle.update({
    where: {
      id,
    },
    data: {
        truckNumber: input.truckNumber,
        brand: input.brand,
        type: input.type,
        machineNumber: input.machineNumber,
        frameNumber: input.frameNumber,
        cylinder: input.cylinder,
        color: input.color,
        stnkExpired: input.stnkExpired,
        taxExpired: input.taxExpired,
        keurExpired: input.keurExpired,
    },
  });
}

export async function deleteVehicle(id: string): Promise<Vehicle> {
  return await prisma.vehicle.delete({ where: { id } });
}
