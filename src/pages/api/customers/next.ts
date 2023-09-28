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

  // Buat variabel code untuk menampung nilai kembalian nanti
  let code = "";

  // Cek customer type dari request query dan buat code yang sesuai dengan customer type nya
  switch (parsedQuery.data.type) {
    case "factory":
      code =
        "CFC" +
        ((await CustomerModel.count({ type: "factory" })) + 1)
          .toString()
          .padStart(5, "0");
      break;
    case "shipping":
      code =
        "CSC" +
        ((await CustomerModel.count({ type: "shipping" })) + 1)
          .toString()
          .padStart(5, "0");
      break;
    case "vendor":
      code =
        "CVC" +
        ((await CustomerModel.count({ type: "vendor" })) + 1)
          .toString()
          .padStart(5, "0");
      break;
  }

  return res.status(200).json({
    data: code,
    error: null,
  });
}
