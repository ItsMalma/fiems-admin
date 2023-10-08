import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import { RouteModel, RouteOutput } from "@/models/route.model";
import connect from "@/libs/mongodb";
import moment from "moment";
import {
  validateSaveRoute,
  validateRouteCode,
} from "@/validations/route.validation";

async function update(
  code: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<RouteOutput>>
) {
  // Ambil route dari db dengan code yang di request
  let route = await RouteModel.findOne({ code });

  // Cek apakah route tidak ada
  if (!route) {
    return res.status(404).json({
      data: null,
      error: `Route with code ${code} not exists`,
    });
  }

  // Validasi request body
  const parsedBody = validateSaveRoute(req.body);

  // Cek apakah validasi tidak sukses
  if (parsedBody.error) {
    return res.status(401).json(parsedBody);
  }

  // Ubah data route dari db dengan request
  route.province = parsedBody.data.province;
  route.city = parsedBody.data.city;
  route.originDescription = parsedBody.data.originDescription;
  route.destinationDescription = parsedBody.data.destinationDescription;

  // Simpan data route yang telah diubah ke db
  route = await route.save();

  return res.status(200).json({
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

async function remove(
  code: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<RouteOutput>>
) {
  // Ambil route dari db dengan code yang di request dan hapus kalau ketemu
  const route = await RouteModel.findOneAndDelete({ code });

  // Cek apakah route tidak ada
  if (!route) {
    return res.status(404).json({
      data: null,
      error: `Route with code ${code} not exists`,
    });
  }

  return res.status(200).json({
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<RouteOutput>>
) {
  // Koneksikan ke db
  await connect();

  // Validasi query
  const parsedQuery = validateRouteCode(req.query);

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
