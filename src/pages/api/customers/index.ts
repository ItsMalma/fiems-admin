import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import {
  CustomerModel,
  CustomerOutput,
  formatCustomerCode,
  getNumberCustomerCode,
} from "@/models/customer.model";
import {
  CustomerGroupModel,
  CustomerGroup,
} from "@/models/customerGroup.model";
import connect from "@/libs/mongodb";
import moment from "moment";
import {
  validateCustomerSave,
  validateCustomerFilter,
} from "@/validations/customer.validation";

async function create(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<CustomerOutput>>
) {
  // Validasi request body
  const parsedBody = validateCustomerSave(req.body);

  // Cek apakah hasil validasi error
  if (parsedBody.error) {
    return res.status(400).json(parsedBody);
  }

  // Ambil data customer group dengan code yang sesuai dari request
  const customerGroup = await CustomerGroupModel.findOne({
    code: parsedBody.data.group,
  });

  // Cek apakah data customer group tidak ada
  if (!customerGroup) {
    return res.status(404).json({
      data: null,
      error: `No customer group with code ${parsedBody.data.group}`,
    });
  }

  // Ambil data customer terakhir
  let lastCustomer = await CustomerModel.findOne().sort({
    _id: -1,
  });

  // Buat data customer baru dan isi semua datanya dengan request
  let customer = new CustomerModel();
  customer._id = (lastCustomer?._id ?? 0) + 1;
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

  // Ambil data customer terakhir dengan tipe yang sama
  lastCustomer = await CustomerModel.findOne({
    type: customer.type,
  }).sort({
    _id: -1,
  });

  customer.code = formatCustomerCode(
    customer.type,
    getNumberCustomerCode(lastCustomer?.code) + 1
  );

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
      createDate: moment(customer.createDate).format("DD/MM/YYYY"),
      status: customer.status,
    },
    error: null,
  });
}

async function findAll(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<CustomerOutput[]>>
) {
  // Validasi request query
  const parsedQuery = validateCustomerFilter(req.query);

  // Cek apakah hasil validasi error
  if (parsedQuery.error) {
    return res.status(400).json(parsedQuery);
  }

  // Buat filter query sebagai filter saat mendapatkan data di db
  const filterQuery: { [key: string]: any } = {};

  // Cek apakah ada query type
  if (parsedQuery.data.type) {
    filterQuery["type"] = parsedQuery.data.type;
  }

  // Ambil semua data customer dari db
  // lakukan populate untuk mengambil data customer group yang berkaitan dengan data customer yang diambil
  const customers = await CustomerModel.find(filterQuery).populate<{
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
