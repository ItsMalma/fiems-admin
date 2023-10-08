import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import { PortModel, PortOutput } from "@/models/port.model";
import connect from "@/libs/mongodb";
import moment from "moment";
import { validateSavePort } from "@/validations/port.validation";

async function create(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<PortOutput>>
) {
  // Validasi request body
  const parsedBody = validateSavePort(req.body);

  // Cek apakah invalid
  if (parsedBody.error) {
    return res.status(401).json(parsedBody);
  }

  // Ambil data port terakhir
  const lastPort = await PortModel.findOne().sort({
    _id: -1,
  });

  // Buat data port baru
  let port = new PortModel();
  port._id = (lastPort?._id ?? 0) + 1;
  port.province = parsedBody.data.province;
  port.city = parsedBody.data.city;
  port.name = parsedBody.data.name;
  port.code = "PC" + ((lastPort?._id ?? 0) + 1).toString().padStart(5, "0");

  // Simpan data port baru ke db
  port = await port.save();

  return res.status(201).json({
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

async function findAll(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<PortOutput[]>>
) {
  // Ambil semua data port dari db
  const ports = await PortModel.find();

  return res.status(200).json({
    data: ports.map((port) => ({
      id: port._id,
      createDate: moment(port.createDate).format("DD/MM/YYYY"),
      code: port.code,
      province: port.province,
      city: port.city,
      name: port.name,
    })),
    error: null,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<PortOutput | PortOutput[]>>
) {
  // Koneksikan ke db
  await connect();

  // Cek request method yang sesuai dan panggi function yang sesuai
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
