import prisma from "@/server/prisma";
import { TypeRequest } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  RequestInput,
  createRequestNumber,
  extractRequestNumber,
} from "../dtos/request.dto";

export async function findNextRequestNumber() {
  const lastRequest = await prisma.request.findFirst({
    orderBy: { number: "desc" },
  });
  if (!lastRequest) {
    return createRequestNumber(1);
  }

  return createRequestNumber(extractRequestNumber(lastRequest.number) + 1);
}

export async function findRequestByNumber(requestNumber: string) {
  const spm = await prisma.request.findFirst({
    where: { number: requestNumber },
    include: {
      details: { include: { product: true } },
    },
  });
  if (!spm) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Tidak ada request dengan nomor ${requestNumber}`,
    });
  }

  return spm;
}

export async function findAllRequest() {
  return await prisma.request.findMany({
    include: {
      details: { include: { product: true } },
    },
  });
}

export async function createRequest(input: RequestInput) {
  return await prisma.request.create({
    data: {
      number: await findNextRequestNumber(),
      typeRequest: input.typeRequest as TypeRequest,
      details: {
        create: input.details.map((d) => ({
          product: { connect: { skuCode: d.product } },
          qty: d.qty,
          remarks: d.remarks,
        })),
      },
    },
  });
}
