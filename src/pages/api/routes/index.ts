import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import { RouteModel, RouteOutput } from "@/models/route.model";
import connect from "@/libs/mongodb";
import moment from "moment";
import { validateSaveRoute } from "@/validations/route.validation";

async function create(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<RouteOutput>>
) {
  // Validasi request body
  const parsedBody = validateSaveRoute(req.body);

  // Cek apakah invalid
  if (parsedBody.error) {
    return res.status(401).json(parsedBody);
  }

  // Ambil data route terakhir
  const lastRoute = await RouteModel.findOne().sort({
    _id: -1,
  });

  // Buat data route baru
  let route = new RouteModel();
  route._id = (lastRoute?._id ?? 0) + 1;
  route.province = parsedBody.data.province;
  route.city = parsedBody.data.city;
  route.originDescription = parsedBody.data.originDescription;
  route.destinationDescription = parsedBody.data.destinationDescription;
  route.code = "RC" + ((lastRoute?._id ?? 0) + 1).toString().padStart(5, "0");

  // Simpan data route baru ke db
  route = await route.save();

  return res.status(201).json({
    data: {
      id: route._id,
      createDate: moment(route.createDate).format("DD/MM/YYYY"),
      code: route.code,
      province: route.province,
      city: route.city,
      originDescription: route.originDescription,
      destinationDescription: route.destinationDescription,
    },
    error: null,
  });
}

async function findAll(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<RouteOutput[]>>
) {
  // Ambil semua data route dari db
  const routes = await RouteModel.find();

  return res.status(200).json({
    data: routes.map((route) => ({
      id: route._id,
      createDate: moment(route.createDate).format("DD/MM/YYYY"),
      code: route.code,
      province: route.province,
      city: route.city,
      originDescription: route.originDescription,
      destinationDescription: route.destinationDescription,
    })),
    error: null,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<RouteOutput | RouteOutput[]>>
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
