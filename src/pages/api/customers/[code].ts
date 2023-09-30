import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import { CustomerModel, CustomerOutput } from "@/models/customer.model";
import {
  CustomerGroupModel,
  CustomerGroup,
} from "@/models/customerGroup.model";
import connect from "@/libs/mongodb";
import moment from "moment";
import {
  validateCustomerCode,
  validateCustomerSave,
} from "@/validations/customer.validation";

async function findById(
  code: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<CustomerOutput>>
) {
  // Ambil data customer dari db dengan code yang sesuai di request lalu hapus jika ketemu
  // lakukan populate untuk mendapatkan juga data customer group yang terkait
  const customer = await CustomerModel.findOne({
    code,
  }).populate<{
    group: CustomerGroup;
  }>("group");

  // Cek apakah data customer tidak ada
  if (!customer) {
    return res.status(404).json({
      data: null,
      error: `Customer with code ${code} not exists`,
    });
  }

  return res.status(200).json({
    data: {
      id: customer._id,
      createDate: moment(customer.createDate).format("DD/MM/YYYY"),
      code: customer.code,
      type: customer.type,
      name: customer.name,
      group: customer.group.code,
      address: customer.address,
      city: customer.city,
      province: customer.province,
      telephone: customer.telephone,
      fax: customer.fax,
      email: customer.email,
      top: customer.top,
      currency: customer.currency,
      pic: customer.pic,
      status: customer.status,
    },
    error: null,
  });
}

async function update(
  code: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<CustomerOutput>>
) {
  // Ambil data customer dari db dengan code yang sesuai di request
  let customer = await CustomerModel.findOne({ code });

  // Cek apakah data customer tidak ada
  if (!customer) {
    return res.status(404).json({
      data: null,
      error: `Customer with code ${code} not exists`,
    });
  }

  // Validasi request body
  const parsedBody = validateCustomerSave(req.body);

  // Cek apakah request body invalid
  if (parsedBody.error) {
    return res.status(401).json(parsedBody);
  }

  // Ambil data customer group dari db dengan code yang sesuai di request
  const customerGroup = await CustomerGroupModel.findOne({
    code: parsedBody.data.group,
  });

  // Cek apakah data customer group tidak ada
  if (!customerGroup) {
    return res.status(404).json({
      data: null,
      error: `No customer group with id ${parsedBody.data.group}`,
    });
  }

  // Ubah data customer yang diambil dari db barusan dengan request
  customer.name = parsedBody.data.name;
  customer.group = customerGroup._id;
  customer.address = parsedBody.data.address;
  customer.city = parsedBody.data.city;
  customer.province = parsedBody.data.province;
  customer.telephone = parsedBody.data.telephone;
  customer.fax = parsedBody.data.fax;
  customer.email = parsedBody.data.email;
  customer.top = parsedBody.data.top;
  customer.currency = parsedBody.data.currency;
  customer.pic = parsedBody.data.pic;

  // Ambil data customer terakhir
  const lastCustomer = await CustomerModel.findOne({
    type: customer.type,
  }).sort({
    _id: -1,
  });

  // Cek apakah terjadi perubahan pada customer type
  if (customer.type !== parsedBody.data.type) {
    // Ubah data customer type dengan type yang baru
    customer.type = parsedBody.data.type;

    // Cek customer type yang baru dan buat ulang customer code
    switch (customer.type) {
      case "factory":
        customer.code =
          "CFC" + ((lastCustomer?._id ?? 0) + 1).toString().padStart(5, "0");
        break;
      case "shipping":
        customer.code =
          "CSC" + ((lastCustomer?._id ?? 0) + 1).toString().padStart(5, "0");
        break;
      case "vendor":
        customer.code =
          "CVC" + ((lastCustomer?._id ?? 0) + 1).toString().padStart(5, "0");
        break;
    }
  }

  // Simpan data customer yang baru ke db
  customer = await customer.save();

  return res.status(200).json({
    data: {
      id: customer._id,
      createDate: moment(customer.createDate).format("DD/MM/YYYY"),
      code: customer.code,
      type: customer.type,
      name: customer.name,
      group: customerGroup.code,
      address: customer.address,
      city: customer.city,
      province: customer.province,
      telephone: customer.telephone,
      fax: customer.fax,
      email: customer.email,
      top: customer.top,
      currency: customer.currency,
      pic: customer.pic,
      status: customer.status,
    },
    error: null,
  });
}

async function remove(
  code: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<CustomerOutput>>
) {
  // Ambil data customer dari db dengan code yang sesuai di request lalu hapus jika ketemu
  // lakukan populate untuk mendapatkan juga data customer group yang terkait
  const customer = await CustomerModel.findOneAndDelete({
    code,
  }).populate<{
    group: CustomerGroup;
  }>("group");

  // Cek apakah customer tidak ada
  if (!customer) {
    return res.status(404).json({
      data: null,
      error: `Customer with code ${code} not exists`,
    });
  }

  return res.status(200).json({
    data: {
      id: customer._id,
      createDate: moment(customer.createDate).format("DD/MM/YYYY"),
      code: customer.code,
      type: customer.type,
      name: customer.name,
      group: customer.group.code,
      address: customer.address,
      city: customer.city,
      province: customer.province,
      telephone: customer.telephone,
      fax: customer.fax,
      email: customer.email,
      top: customer.top,
      currency: customer.currency,
      pic: customer.pic,
      status: customer.status,
    },
    error: null,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<CustomerOutput>>
) {
  // Koneksikan ke db
  await connect();

  // Validasi request query
  const parsedQuery = validateCustomerCode(req.query);

  // Cek apakah invalid
  if (parsedQuery.error) {
    return res.status(400).json(parsedQuery);
  }

  // Cek request method dan panggil function yang sesuai
  switch (req.method) {
    case "GET":
      return await findById(parsedQuery.data.code, req, res);
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
