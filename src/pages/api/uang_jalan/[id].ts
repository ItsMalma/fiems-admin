import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import { UangJalanModel, UangJalanOutput } from "@/models/uangJalan.model";
import connect from "@/libs/mongodb";
import {
  validateUangJalanID,
  validateUangJalanSave,
} from "@/validations/uangJalan.validation";
import { CustomerModel, Customer } from "@/models/customer.model";
import { RouteModel, Route } from "@/models/route.model";
import moment from "moment";

async function findById(
  id: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<UangJalanOutput>>
) {
  // Ambil data uang jalan dari db dengan id yang sesuai di request
  // lakukan populate untuk mengambil data customer dan route yang bersangkutan dengan data uang jalan
  const uangJalan = await UangJalanModel.findOne({
    _id: id,
  })
    .populate<{
      customer: Customer;
    }>("customer")
    .populate<{
      route: Route;
    }>("route");

  // Cek apakah data uang jalan tidak ada
  if (!uangJalan) {
    return res.status(404).json({
      data: null,
      error: `Uang jalan with id ${id} not exists`,
    });
  }

  return res.status(200).json({
    data: {
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
    },
    error: null,
  });
}

async function update(
  id: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<UangJalanOutput>>
) {
  // Ambil data uang jalan dari db dengan code yang sesuai di request
  let uangJalan = await UangJalanModel.findOne({ _id: id });

  // Cek apakah data uangJalan tidak ada
  if (!uangJalan) {
    return res.status(404).json({
      data: null,
      error: `Uang jalan with id ${id} not exists`,
    });
  }

  // Validasi request body
  const parsedBody = validateUangJalanSave(req.body);

  // Cek apakah request body invalid
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

  // Ubah data uang jalan yang diambil dari db barusan dengan request
  uangJalan.customer = customer._id;
  uangJalan.route = route._id;
  uangJalan.truckType = parsedBody.data.truckType;
  uangJalan.containerSize = parsedBody.data.containerSize;
  uangJalan.fuelOil = parsedBody.data.fuelOil;
  uangJalan.toll = parsedBody.data.toll;
  uangJalan.labourCosts = parsedBody.data.labourCosts;
  uangJalan.meal = parsedBody.data.meal;
  uangJalan.etc = parsedBody.data.etc;

  // Simpan data uang jalan yang baru ke db
  uangJalan = await uangJalan.save();

  return res.status(200).json({
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

async function remove(
  id: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<UangJalanOutput>>
) {
  // Ambil data uang jalan dari db dengan code yang sesuai di request lalu hapus jika ketemu
  // lakukan populate untuk mengambil data customer dan route yang bersangkutan dengan data uang jalan
  const uangJalan = await UangJalanModel.findOneAndDelete({
    _id: id,
  })
    .populate<{
      customer: Customer;
    }>("customer")
    .populate<{
      route: Route;
    }>("route");

  // Cek apakah uangJalan tidak ada
  if (!uangJalan) {
    return res.status(404).json({
      data: null,
      error: `Uang jalan with id ${id} not exists`,
    });
  }

  return res.status(200).json({
    data: {
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
    },
    error: null,
  });
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<UangJalanOutput>>
) {
  // Koneksikan ke db
  await connect();

  // Validasi request query
  const parsedQuery = validateUangJalanID(req.query);

  // Cek apakah invalid
  if (parsedQuery.error) {
    return res.status(400).json(parsedQuery);
  }

  // Cek request method dan panggil function yang sesuai
  switch (req.method) {
    case "GET":
      return await findById(parsedQuery.data.id, req, res);
    case "PUT":
      return await update(parsedQuery.data.id, req, res);
    case "DELETE":
      return await remove(parsedQuery.data.id, req, res);
    default:
      return res.status(405).json({
        data: null,
        error: "Method not allowed",
      });
  }
}
