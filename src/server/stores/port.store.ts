import { Port } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { PortInput, createPortCode, extractPortCode } from "../dtos/port.dto";
import prisma from "../prisma";

export async function findAllPort() {
  return await prisma.port.findMany();
}

export async function findPortByCode(code: string) {
  const port = await prisma.port.findFirst({ where: { code } });
  if (!port) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Port with code ${code} not exists`,
    });
  }

  return port;
}

export async function findNextPortCode() {
  const nextPort = await prisma.port.findFirst({
    orderBy: {
      code: "desc",
    },
  });

  if (nextPort) {
    return createPortCode(extractPortCode(nextPort.code) + 1);
  } else {
    return createPortCode(1);
  }
}

export async function createPort(
  code: string,
  input: PortInput
): Promise<Port> {
  return await prisma.port.create({
    data: {
      code: code,
      province: input.province,
      city: input.city,
      name: input.name,
    },
  });
}

export async function updatePort(
  code: string,
  input: PortInput
): Promise<Port> {
  return await prisma.port.update({
    where: {
      code,
    },
    data: {
      province: input.province,
      city: input.city,
      name: input.name,
    },
  });
}

export async function deletePort(code: string): Promise<Port> {
  return await prisma.port.delete({ where: { code } });
}
