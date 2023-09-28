import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import { CustomerModel, CustomerOutput } from "@/models/customer.model";
import {
  CustomerGroupModel,
  CustomerGroup,
} from "@/models/customerGroup.model";
import connect from "@/libs/mongodb";
import moment from "moment";
import { validateCustomerSave } from "@/validations/customer.validation";

async function create(req: NextApiRequest, res: NextApiResponse) {
  // Validasi request body
  const parsedBody = validateCustomerSave(req.body);

  // Cek apakah hasil validasi error
  if (parsedBody.error) {
    return res.status(401).json(parsedBody);
  }

  // Ambil data customer group dengan code yang sesuai dari request
  const customerGroup = await CustomerGroupModel.findOne({
    code: parsedBody.data.group,
  });

  // Cek apakah data customer group tidak ada
  if (!customerGroup) {
    return res.status(404).json({
      error: `No customer group with id ${parsedBody.data.group}`,
    });
  }

  // Buat data customer baru dan isi semua datanya dengan request
  let customer = new CustomerModel();
  customer._id = (await CustomerModel.count()) + 1;
  customer.type = parsedBody.data.type;
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
  customer.status = true;

  // Buat customer code berdasarkan customer type
  switch (customer.type) {
    case "factory":
      customer.code =
        "CFC" +
        ((await CustomerModel.count({ type: "factory" })) + 1)
          .toString()
          .padStart(5, "0");
      break;
    case "shipping":
      customer.code =
        "CSC" +
        ((await CustomerModel.count({ type: "shipping" })) + 1)
          .toString()
          .padStart(5, "0");
      break;
    case "vendor":
      customer.code =
        "CVC" +
        ((await CustomerModel.count({ type: "vendor" })) + 1)
          .toString()
          .padStart(5, "0");
      break;
  }

  // Simpan data customer ke db
  customer = await customer.save();

  return res.status(201).json({
    data: {
      id: customer._id,
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
      code: customer.code,
      createDate: customer.createDate,
    },
  });
}

async function findAll(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<CustomerOutput[]>>
) {
  // Ambil semua data customer dari db
  // lakukan populate untuk mengambil data customer group yang berkaitan dengan data customer yang diambil
  const customers = await CustomerModel.find().populate<{
    group: CustomerGroup;
  }>("group");

  return res.status(200).json({
    data: customers.map((customer) => ({
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
    })),
    error: null,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<CustomerOutput | CustomerOutput[]>>
) {
  // Koneksikan ke db
  await connect();

  // Cek request method dan panggil function yang sesuai
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
