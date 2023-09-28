import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import {
  CustomerGroupModel,
  CustomerGroupOutput,
} from "@/models/customerGroup.model";
import connect from "@/libs/mongodb";
import moment from "moment";
import { validateSaveCustomerGroup } from "@/validations/customerGroup.validation";

async function create(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<CustomerGroupOutput>>
) {
  // Validasi request body
  const parsedBody = validateSaveCustomerGroup(req.body);

  // Cek apakah invalid
  if (parsedBody.error) {
    return res.status(401).json(parsedBody);
  }

  // Ambil data customer group terakhir
  const lastCustomerGroup = await CustomerGroupModel.findOne().sort({
    _id: -1,
  });

  // Buat data customer group baru
  let customerGroup = new CustomerGroupModel();
  customerGroup._id = (lastCustomerGroup?._id ?? 0) + 1;
  customerGroup.name = parsedBody.data.name;
  customerGroup.description = parsedBody.data.description;
  customerGroup.code =
    "CGC" + ((lastCustomerGroup?._id ?? 0) + 1).toString().padStart(5, "0");

  // Simpan data customer group baru ke db
  customerGroup = await customerGroup.save();

  return res.status(201).json({
    data: {
      id: customerGroup._id,
      createDate: moment(customerGroup.createDate).format("DD/MM/YYYY"),
      code: customerGroup.code,
      name: customerGroup.name,
      description: customerGroup.description,
    },
    error: null,
  });
}

async function findAll(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<CustomerGroupOutput[]>>
) {
  // Ambil semua data customer group dari db
  const customerGroups = await CustomerGroupModel.find();

  return res.status(200).json({
    data: customerGroups.map((customerGroup) => ({
      id: customerGroup._id,
      createDate: moment(customerGroup.createDate).format("DD/MM/YYYY"),
      code: customerGroup.code,
      name: customerGroup.name,
      description: customerGroup.description,
    })),
    error: null,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    ApiResponsePayload<CustomerGroupOutput | CustomerGroupOutput[]>
  >
) {
  // Koneksikan ke db
  await connect();

  // Cek request method yang sesuai dan panggi function yang sesuai
  switch (req.method) {
    case "POST":
      return await create(req, res);
    case "GET":
      return await findAll(req, res);
    default:
      return res.status(405).json({
        data: null,
        error: "Method not allowed",
      });
  }
}
