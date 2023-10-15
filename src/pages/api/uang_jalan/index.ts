import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import { UangJalanModel, UangJalanOutput } from "@/models/uangJalan.model";
import connect from "@/libs/mongodb";
import { validateUangJalanSave } from "@/validations/uangJalan.validation";
import { CustomerModel, Customer } from "@/models/customer.model";
import { RouteModel, Route } from "@/models/route.model";
import moment from "moment";

async function create(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<UangJalanOutput>>
) {
  // Validasi request body
  const parsedBody = validateUangJalanSave(req.body);

  // Cek apakah hasil validasi error
  if (parsedBody.error) {
    return res.status(400).json(parsedBody);
  }

  // Ambil data customer dengan code yang sesuai dari request
  const customer = await CustomerModel.findOne({
    code: parsedBody.data.customer,
  });

  // Cek apakah data customer tidak ada
  if (!customer) {
    return res.status(404).json({
      data: null,
      error: `Customer with code ${parsedBody.data.customer} not exists`,
    });
  }

  // Ambil data route dengan code yang sesuai dari request
  const route = await RouteModel.findOne({
    code: parsedBody.data.route,
  });

  // Cek apakah data route tidak ada
  if (!route) {
    return res.status(404).json({
      data: null,
      error: `Route with code ${parsedBody.data.route} not exists`,
    });
  }

  // Ambil data uang jalan terakhir
  const lastUangJalan = await UangJalanModel.findOne().sort({
    _id: -1,
  });

  // Buat data uang jalan baru dan isi semua datanya dengan request
  let uangJalan = new UangJalanModel();
  uangJalan._id = (lastUangJalan?.id ?? 0) + 1;
  uangJalan.customer = customer._id;
  uangJalan.route = route._id;
  uangJalan.truckType = parsedBody.data.truckType;
  uangJalan.containerSize = parsedBody.data.containerSize;
  uangJalan.fuelOil = parsedBody.data.fuelOil;
  uangJalan.toll = parsedBody.data.toll;
  uangJalan.labourCosts = parsedBody.data.labourCosts;
  uangJalan.meal = parsedBody.data.meal;
  uangJalan.etc = parsedBody.data.etc;
  uangJalan.status = true;

  // Simpan data uang jalan ke db
  uangJalan = await uangJalan.save();

  return res.status(201).json({
    data: {
      id: uangJalan.id,
      customer: {
        code: customer.code,
        name: customer.name,
      },
      route: route.code,
      truckType: uangJalan.truckType,
      containerSize: uangJalan.containerSize,
      fuelOil: uangJalan.fuelOil,
      toll: uangJalan.toll,
      labourCosts: uangJalan.labourCosts,
      meal: uangJalan.meal,
      etc: uangJalan.etc,
      total:
        uangJalan.fuelOil +
        uangJalan.toll +
        uangJalan.labourCosts +
        uangJalan.meal +
        uangJalan.etc,
      createDate: moment(uangJalan.createDate).format("DD/MM/YYYY"),
      status: uangJalan.status,
    },
    error: null,
  });
}

async function findAll(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<UangJalanOutput[]>>
) {
  // Ambil semua data uang jalan dari db
  // lakukan populate untuk mengambil data customer dan route yang bersangkutan dengan data uang jalan
  const listUangJalan = await UangJalanModel.find()
    .populate<{
      customer: Customer;
    }>("customer")
    .populate<{
      route: Route;
    }>("route");

  return res.status(200).json({
    data: listUangJalan.map((uangJalan) => ({
      id: uangJalan.id,
      customer: {
        code: uangJalan.customer.code,
        name: uangJalan.customer.name,
      },
      route: uangJalan.route.code,
      truckType: uangJalan.truckType,
      containerSize: uangJalan.containerSize,
      fuelOil: uangJalan.fuelOil,
      toll: uangJalan.toll,
      labourCosts: uangJalan.labourCosts,
      meal: uangJalan.meal,
      etc: uangJalan.etc,
      total:
        uangJalan.fuelOil +
        uangJalan.toll +
        uangJalan.labourCosts +
        uangJalan.meal +
        uangJalan.etc,
      createDate: moment(uangJalan.createDate).format("DD/MM/YYYY"),
      status: uangJalan.status,
    })),
    error: null,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<UangJalanOutput | UangJalanOutput[]>>
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
