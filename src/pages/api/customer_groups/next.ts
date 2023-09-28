import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import { CustomerGroupModel } from "@/models/customerGroup.model";
import connect from "@/libs/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<string>>
) {
  // Koneksikan ke db
  await connect();

  // Cek apakah request method bukan GET
  if (req.method !== "GET") {
    return res.status(405).json({
      data: null,
      error: "Method not allowed",
    });
  }

  // Ambil data customer group terakhir
  const lastCustomerGroup = await CustomerGroupModel.findOne().sort({
    _id: -1,
  });

  return res.status(200).json({
    data: "CGC" + (lastCustomerGroup?.id ?? 0 + 1).toString().padStart(5, "0"),
    error: null,
  });
}
