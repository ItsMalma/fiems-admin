import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import { CustomerModel } from "@/models/customer.model";
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

  // Buat variabel code untuk menampung nilai kembalian nanti
  let code = "";

  // Cek customer type dari request query dan buat code yang sesuai dengan customer type nya
  switch (parsedQuery.data.type) {
    case "factory":
      code = "CFC" + ((lastCustomer?._id ?? 0) + 1).toString().padStart(5, "0");
      break;
    case "shipping":
      code = "CSC" + ((lastCustomer?._id ?? 0) + 1).toString().padStart(5, "0");
      break;
    case "vendor":
      code = "CVC" + ((lastCustomer?._id ?? 0) + 1).toString().padStart(5, "0");
      break;
  }

  return res.status(200).json({
    data: code,
    error: null,
  });
}