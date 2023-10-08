import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import { VehicleOutput, VehicleModel } from "@/models/vehicle.model";
import connect from "@/libs/mongodb";
import {
  validateVehicleNumber,
  validateVehicleSave,
} from "@/validations/vehicle.validation";
import { Customer, CustomerModel } from "@/models/customer.model";
import moment from "moment";

async function findByNumber(
  number: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<VehicleOutput>>
) {
  // Ambil data vehicle dari db dengan number yang sesuai di request
  // lakukan populate untuk mengambil data vendor yang bersangkutan dengan data vehicle
  const vehicle = await VehicleModel.findOne({
    truckNumber: number,
  }).populate<{ vendor: Customer }>("vendor");

  // Cek apakah data vehicle tidak ada
  if (!vehicle) {
    return res.status(404).json({
      data: null,
      error: `Vehicle with number ${number} not exists`,
    });
  }

  return res.status(200).json({
    data: {
      id: vehicle.id,
      vendor: { code: vehicle.vendor.code, name: vehicle.vendor.name },
      truckNumber: vehicle.truckNumber,
      brand: vehicle.brand,
      truckType: vehicle.truckType,
      engineNumber: vehicle.engineNumber,
      chassisNumber: vehicle.chassisNumber,
      cylinder: vehicle.cylinder,
      color: vehicle.color,
      stnkExpired: moment(vehicle.stnkExpired).format("DD/MM/YYYY"),
      taxExpired: moment(vehicle.taxExpired).format("DD/MM/YYYY"),
      keurExpired: moment(vehicle.keurExpired).format("DD/MM/YYYY"),
      createDate: moment(vehicle.createDate).format("DD/MM/YYYY"),
      status: vehicle.status,
    },
    error: null,
  });
}

async function update(
  number: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<VehicleOutput>>
) {
  // Ambil data vehicle dari db dengan code yang sesuai di request
  let vehicle = await VehicleModel.findOne({ truckNumber: number });

  // Cek apakah data vehicle tidak ada
  if (!vehicle) {
    return res.status(404).json({
      data: null,
      error: `Vehicle with number ${number} not exists`,
    });
  }

  // Validasi request body
  const parsedBody = validateVehicleSave(req.body);

  // Cek apakah request body invalid
  if (parsedBody.error) {
    return res.status(401).json(parsedBody);
  }

  // Ambil data vendor dari db dengan code yang sesuai di request
  const vendor = await CustomerModel.findOne({
    type: "vendor",
    code: parsedBody.data.vendor,
  });

  // Cek apakah data vendor tidak ada
  if (!vendor) {
    return res.status(404).json({
      data: null,
      error: `Vendor with code ${parsedBody.data.vendor} not exists`,
    });
  }

  // Ubah data vehicle yang diambil dari db barusan dengan request
  vehicle.vendor = vendor._id;
  vehicle.truckNumber = parsedBody.data.truckNumber;
  vehicle.brand = parsedBody.data.brand;
  vehicle.truckType = parsedBody.data.truckType;
  vehicle.engineNumber = parsedBody.data.engineNumber;
  vehicle.chassisNumber = parsedBody.data.chassisNumber;
  vehicle.cylinder = parsedBody.data.cylinder;
  vehicle.color = parsedBody.data.color;
  vehicle.stnkExpired = moment(
    parsedBody.data.stnkExpired,
    "DD/MM/YYYY"
  ).toDate();
  vehicle.taxExpired = moment(
    parsedBody.data.taxExpired,
    "DD/MM/YYYY"
  ).toDate();
  vehicle.keurExpired = moment(
    parsedBody.data.keurExpired,
    "DD/MM/YYYY"
  ).toDate();

  // Ambil data vehicle terakhir
  const lastVehicle = await VehicleModel.findOne().sort({
    _id: -1,
  });

  // Simpan data vehicle yang baru ke db
  vehicle = await vehicle.save();

  return res.status(200).json({
    data: {
      id: vehicle.id,
      vendor: { code: vendor.code, name: vendor.name },
      truckNumber: vehicle.truckNumber,
      brand: vehicle.brand,
      truckType: vehicle.truckType,
      engineNumber: vehicle.engineNumber,
      chassisNumber: vehicle.chassisNumber,
      cylinder: vehicle.cylinder,
      color: vehicle.color,
      stnkExpired: moment(vehicle.stnkExpired).format("DD/MM/YYYY"),
      taxExpired: moment(vehicle.taxExpired).format("DD/MM/YYYY"),
      keurExpired: moment(vehicle.keurExpired).format("DD/MM/YYYY"),
      createDate: moment(vehicle.createDate).format("DD/MM/YYYY"),
      status: vehicle.status,
    },
    error: null,
  });
}

async function remove(
  number: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<VehicleOutput>>
) {
  // Ambil data vehicle dari db dengan code yang sesuai di request lalu hapus jika ketemu
  // lakukan populate untuk mendapatkan juga data vendor yang terkait
  const vehicle = await VehicleModel.findOneAndDelete({
    truckNumber: number,
  }).populate<{
    vendor: Customer;
  }>("vendor");

  // Cek apakah vehicle tidak ada
  if (!vehicle) {
    return res.status(404).json({
      data: null,
      error: `Vehicle with number ${number} not exists`,
    });
  }

  return res.status(200).json({
    data: {
      id: vehicle.id,
      vendor: { code: vehicle.vendor.code, name: vehicle.vendor.name },
      truckNumber: vehicle.truckNumber,
      brand: vehicle.brand,
      truckType: vehicle.truckType,
      engineNumber: vehicle.engineNumber,
      chassisNumber: vehicle.chassisNumber,
      cylinder: vehicle.cylinder,
      color: vehicle.color,
      stnkExpired: moment(vehicle.stnkExpired).format("DD/MM/YYYY"),
      taxExpired: moment(vehicle.taxExpired).format("DD/MM/YYYY"),
      keurExpired: moment(vehicle.keurExpired).format("DD/MM/YYYY"),
      createDate: moment(vehicle.createDate).format("DD/MM/YYYY"),
      status: vehicle.status,
    },
    error: null,
  });
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<VehicleOutput>>
) {
  // Koneksikan ke db
  await connect();

  // Validasi request query
  const parsedQuery = validateVehicleNumber(req.query);

  // Cek apakah invalid
  if (parsedQuery.error) {
    return res.status(400).json(parsedQuery);
  }

  // Cek request method dan panggil function yang sesuai
  switch (req.method) {
    case "GET":
      return await findByNumber(parsedQuery.data.number, req, res);
    case "PUT":
      return await update(parsedQuery.data.number, req, res);
    case "DELETE":
      return await remove(parsedQuery.data.number, req, res);
    default:
      return res.status(405).json({
        data: null,
        error: "Method not allowed",
      });
  }
}
