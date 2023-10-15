import connect from "@/libs/mongodb";
import { ApiResponsePayload } from "@/libs/utils";
import { COAModel } from "@/models/coa.model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<number>>
) {
  await connect();

  if (req.method !== "GET") {
    return res.status(405).json({
      data: null,
      error: "Method not allowed",
    });
  }

  const lastMainCOA = await COAModel.findOne().sort({ _id: -1 });

  return res.status(200).json({
    data: (lastMainCOA?.accountNumber ?? 99) + 1,
    error: null,
  });
}
