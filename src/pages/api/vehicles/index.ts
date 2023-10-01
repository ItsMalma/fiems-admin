import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import { VehicleModel, VehicleOutput } from "@/models/vehicle.model";
import connect from "@/libs/mongodb";
import { validateVehicleSave } from "@/validations/vehicle.validation";
import { CustomerModel, Customer } from "@/models/customer.model";
import moment from "moment";

async function create(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<VehicleOutput>>
) {
  // Validasi request body
  const parsedBody = validateVehicleSave(req.body);

  // Cek apakah hasil validasi error
  if (parsedBody.error) {
    return res.status(401).json(parsedBody);
  }

  // Ambil data vendor dengan code yang sesuai dari request
  const vendor = await CustomerModel.findOne({
    type: "vendor",
    code: parsedBody.data.vendor,
  });

  // Cek apakah data vendor tidak ada
  if (!vendor) {
    return res.status(404).json({
      data: null,
      error: `No vendor with code ${parsedBody.data.vendor}`,
    });
  }

  // Ambil data vehicle terakhir
  const lastVehicle = await VehicleModel.findOne().sort({
    _id: -1,
  });

  // Buat data vehicle baru dan isi semua datanya dengan request
  let vehicle = new VehicleModel();
  vehicle._id = (lastVehicle?.id ?? 0) + 1;
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
  vehicle.status = true;

  // Simpan data vehicle ke db
  vehicle = await vehicle.save();

  return res.status(201).json({
    data: {
      id: vehicle.id,
      vendor: {
        code: vendor.code,
        name: vendor.name,
      },
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

async function findAll(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<VehicleOutput[]>>
) {
  // Ambil semua data vehicle dari db
  // lakukan populate untuk mengambil data vendor yang bersangkutan dengan data vehicle
  const vehicles = await VehicleModel.find().populate<{ vendor: Customer }>(
    "vendor"
  );

  return res.status(200).json({
    data: vehicles.map((vehicle) => ({
      id: vehicle.id,
      vendor: {
        code: vehicle.vendor.code,
        name: vehicle.vendor.name,
      },
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
    })),
    error: null,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<VehicleOutput | VehicleOutput[]>>
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
