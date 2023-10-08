import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import { PortModel, PortOutput } from "@/models/port.model";
import connect from "@/libs/mongodb";
import moment from "moment";
import {
  validateSavePort,
  validatePortCode,
} from "@/validations/port.validation";

async function update(
  code: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<PortOutput>>
) {
  // Ambil port dari db dengan code yang di request
  let port = await PortModel.findOne({ code });

  // Cek apakah port tidak ada
  if (!port) {
    return res.status(404).json({
      data: null,
      error: `Port with code ${code} not exists`,
    });
  }

  // Validasi request body
  const parsedBody = validateSavePort(req.body);

  // Cek apakah validasi tidak sukses
  if (parsedBody.error) {
    return res.status(401).json(parsedBody);
  }

  // Ubah data port dari db dengan request
  port.province = parsedBody.data.province;
  port.city = parsedBody.data.city;
  port.name = parsedBody.data.name;

  // Simpan data port yang telah diubah ke db
  port = await port.save();

  return res.status(200).json({
    data: {
      id: port._id,
      createDate: moment(port.createDate).format("DD/MM/YYYY"),
      code: port.code,
      province: port.province,
      city: port.city,
      name: port.name,
    },
    error: null,
  });
}

async function remove(
  code: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<PortOutput>>
) {
  // Ambil port dari db dengan code yang di request dan hapus kalau ketemu
  const port = await PortModel.findOneAndDelete({ code });

  // Cek apakah port tidak ada
  if (!port) {
    return res.status(404).json({
      data: null,
      error: `Port with code ${code} not exists`,
    });
  }

  return res.status(200).json({
    data: {
      id: port._id,
      createDate: moment(port.createDate).format("DD/MM/YYYY"),
      code: port.code,
      province: port.province,
      city: port.city,
      name: port.name,
    },
    error: null,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<PortOutput>>
) {
  // Koneksikan ke db
  await connect();

  // Validasi query
  const parsedQuery = validatePortCode(req.query);

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
