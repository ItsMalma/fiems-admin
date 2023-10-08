import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import {
  CustomerModel,
  formatCustomerCode,
  getNumberCustomerCode,
} from "@/models/customer.model";
import connect from "@/libs/mongodb";
import { validateCustomerType } from "@/validations/customer.validation";

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

  // Validasi request query
  const parsedQuery = validateCustomerType(req.query);

  // Cek apakah hasil validasi error
  if (parsedQuery.error) {
    return res.status(400).json(parsedQuery);
  }

  // Ambil data customer terakhir
  const lastCustomer = await CustomerModel.findOne({
    type: parsedQuery.data.type,
  }).sort({
    _id: -1,
  });

  return res.status(200).json({
    data: formatCustomerCode(
      parsedQuery.data.type,
      getNumberCustomerCode(lastCustomer?.code) + 1
    ),
    error: null,
  });
}
