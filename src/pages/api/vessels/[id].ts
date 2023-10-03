import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import { VesselOutput, VesselModel } from "@/models/vessel.model";
import connect from "@/libs/mongodb";
import {
  validateVesselID,
  validateVesselSave,
} from "@/validations/vessel.validation";
import { Customer, CustomerModel } from "@/models/customer.model";
import moment from "moment";

async function findById(
  id: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<VesselOutput>>
) {
  // Ambil data vessel dari db dengan id yang sesuai di request
  // lakukan populate untuk mengambil data shipping yang bersangkutan dengan data vessel
  const vessel = await VesselModel.findOne({
    _id: id,
  }).populate<{ shipping: Customer }>("shipping");

  // Cek apakah data vessel tidak ada
  if (!vessel) {
    return res.status(404).json({
      data: null,
      error: `Vessel with id ${id} not exists`,
    });
  }

  return res.status(200).json({
    data: {
      id: vessel.id,
      shipping: {
        code: vessel.shipping.code,
        name: vessel.shipping.name,
      },
      name: vessel.name,
      capacity: vessel.capacity,
      unit: vessel.unit,
      createDate: moment(vessel.createDate).format("DD/MM/YYYY"),
      status: vessel.status,
    },
    error: null,
  });
}

async function update(
  id: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<VesselOutput>>
) {
  // Ambil data vessel dari db dengan code yang sesuai di request
  let vessel = await VesselModel.findOne({ _id: id });

  // Cek apakah data vessel tidak ada
  if (!vessel) {
    return res.status(404).json({
      data: null,
      error: `Vessel with id ${id} not exists`,
    });
  }

  // Validasi request body
  const parsedBody = validateVesselSave(req.body);

  // Cek apakah request body invalid
  if (parsedBody.error) {
    return res.status(401).json(parsedBody);
  }

  // Ambil data shipping dari db dengan code yang sesuai di request
  const shipping = await CustomerModel.findOne({
    type: "shipping",
    code: parsedBody.data.shipping,
  });

  // Cek apakah data shipping tidak ada
  if (!shipping) {
    return res.status(404).json({
      data: null,
      error: `Shipping with code ${parsedBody.data.shipping} not exists`,
    });
  }

  // Ubah data vessel yang diambil dari db barusan dengan request
  vessel.shipping = shipping._id;
  vessel.name = parsedBody.data.name;
  vessel.capacity = parsedBody.data.capacity;
  vessel.unit = parsedBody.data.unit;

  // Simpan data vessel yang baru ke db
  vessel = await vessel.save();

  return res.status(200).json({
    data: {
      id: vessel.id,
      shipping: {
        code: shipping.code,
        name: shipping.name,
      },
      name: vessel.name,
      capacity: vessel.capacity,
      unit: vessel.unit,
      createDate: moment(vessel.createDate).format("DD/MM/YYYY"),
      status: vessel.status,
    },
    error: null,
  });
}

async function remove(
  id: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<VesselOutput>>
) {
  // Ambil data vessel dari db dengan code yang sesuai di request lalu hapus jika ketemu
  // lakukan populate untuk mendapatkan juga data shipping yang terkait
  const vessel = await VesselModel.findOneAndDelete({
    _id: id,
  }).populate<{
    shipping: Customer;
  }>("shipping");

  // Cek apakah vessel tidak ada
  if (!vessel) {
    return res.status(404).json({
      data: null,
      error: `Vessel with id ${id} not exists`,
    });
  }

  return res.status(200).json({
    data: {
      id: vessel.id,
      shipping: {
        code: vessel.shipping.code,
        name: vessel.shipping.name,
      },
      name: vessel.name,
      capacity: vessel.capacity,
      unit: vessel.unit,
      createDate: moment(vessel.createDate).format("DD/MM/YYYY"),
      status: vessel.status,
    },
    error: null,
  });
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<VesselOutput>>
) {
  // Koneksikan ke db
  await connect();

  // Validasi request query
  const parsedQuery = validateVesselID(req.query);

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
