import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import {
  CustomerGroupModel,
  CustomerGroupOutput,
} from "@/models/customerGroup.model";
import { CustomerModel } from "@/models/customer.model";
import connect from "@/libs/mongodb";
import moment from "moment";
import {
  validateCustomerGroupCode,
  validateSaveCustomerGroup,
} from "@/validations/customerGroup.validation";

async function update(
  code: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<CustomerGroupOutput>>
) {
  // Ambil customer group dari db dengan code yang di request
  let customerGroup = await CustomerGroupModel.findOne({ code });

  // Cek apakah customer group tidak ada
  if (!customerGroup) {
    return res.status(404).json({
      data: null,
      error: `Customer group with code ${code} not exists`,
    });
  }

  // Validasi request body
  const parsedBody = validateSaveCustomerGroup(req.body);

  // Cek apakah validasi tidak sukses
  if (parsedBody.error) {
    return res.status(400).json(parsedBody);
  }

  // Ubah data customer group dari db dengan request
  customerGroup.name = parsedBody.data.name;
  customerGroup.description = parsedBody.data.description;

  // Simpan data customer group yang telah diubah ke db
  customerGroup = await customerGroup.save();

  return res.status(200).json({
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

async function remove(
  code: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<CustomerGroupOutput>>
) {
  // Ambil customer group dari db dengan code yang di request dan hapus kalau ketemu
  const customerGroup = await CustomerGroupModel.findOneAndDelete({ code });

  // Cek apakah customer group tidak ada
  if (!customerGroup) {
    return res.status(404).json({
      data: null,
      error: `Customer group with code ${code} not exists`,
    });
  }

  // Hapus semua customer yang terhubung dengan customer group yang telah dihapus
  await CustomerModel.deleteMany({ group: customerGroup.id });

  return res.status(200).json({
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<CustomerGroupOutput>>
) {
  // Koneksikan ke db
  await connect();

  // Validasi query
  const parsedQuery = validateCustomerGroupCode(req.query);

  // Cek apakah validasi query error
  if (parsedQuery.error) {
    return res.status(400).json(parsedQuery);
  }

  // Cek method apa yang direquest dan panggil function yang sesuai
  switch (req.method) {
    case "PUT":
      return await update(parsedQuery.data.code, req, res);
    case "DELETE":
      return await remove(parsedQuery.data.code, req, res);
    default:
      return res.status(405).json({
        data: null,
        error: "Method not allowed",
      });
  }
}
