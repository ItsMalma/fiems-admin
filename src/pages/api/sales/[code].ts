import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import { SalesModel, SalesOutput } from "@/models/sales.model";
import connect from "@/libs/mongodb";
import moment from "moment";
import {
  validateSalesCode,
  validateSalesSave,
} from "@/validations/sales.validation";

async function findById(
  code: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<SalesOutput>>
) {
  // Ambil data sales dari db dengan code yang sesuai di request lalu hapus jika ketemu
  const sales = await SalesModel.findOne({ code });

  // Cek apakah data sales tidak ada
  if (!sales) {
    return res.status(404).json({
      data: null,
      error: `Sales with code ${code} not exists`,
    });
  }

  return res.status(200).json({
    data: {
      id: sales._id,
      jobPosition: sales.jobPosition,
      name: sales.name,
      nik: sales.nik,
      cabang: sales.cabang,
      phoneNumber: sales.phoneNumber,
      telephone: sales.telephone,
      fax: sales.fax,
      email: sales.email,
      code: sales.code,
      createDate: moment(sales.createDate).format("DD/MM/YYYY"),
      status: sales.status,
    },
    error: null,
  });
}

async function update(
  code: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<SalesOutput>>
) {
  // Ambil data sales dari db dengan code yang sesuai di request
  let sales = await SalesModel.findOne({ code });

  // Cek apakah data sales tidak ada
  if (!sales) {
    return res.status(404).json({
      data: null,
      error: `Sales with code ${code} not exists`,
    });
  }

  // Validasi request body
  const parsedBody = validateSalesSave(req.body);

  // Cek apakah request body invalid
  if (parsedBody.error) {
    return res.status(401).json(parsedBody);
  }

  // Ubah data sales yang diambil dari db barusan dengan request
  sales.jobPosition = parsedBody.data.jobPosition;
  sales.name = parsedBody.data.name;
  sales.nik = parsedBody.data.nik;
  sales.cabang = parsedBody.data.cabang;
  sales.phoneNumber = parsedBody.data.phoneNumber;
  sales.telephone = parsedBody.data.telephone;
  sales.fax = parsedBody.data.fax;
  sales.email = parsedBody.data.email;

  // Simpan data sales yang baru ke db
  sales = await sales.save();

  return res.status(200).json({
    data: {
      id: sales._id,
      jobPosition: sales.jobPosition,
      name: sales.name,
      nik: sales.nik,
      cabang: sales.cabang,
      phoneNumber: sales.phoneNumber,
      telephone: sales.telephone,
      fax: sales.fax,
      email: sales.email,
      code: sales.code,
      createDate: moment(sales.createDate).format("DD/MM/YYYY"),
      status: sales.status,
    },
    error: null,
  });
}

async function remove(
  code: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<SalesOutput>>
) {
  // Ambil data sales dari db dengan code yang sesuai di request lalu hapus jika ketemu
  const sales = await SalesModel.findOneAndDelete({
    code,
  });

  // Cek apakah sales tidak ada
  if (!sales) {
    return res.status(404).json({
      data: null,
      error: `Sales with code ${code} not exists`,
    });
  }

  return res.status(200).json({
    data: {
      id: sales._id,
      jobPosition: sales.jobPosition,
      name: sales.name,
      nik: sales.nik,
      cabang: sales.cabang,
      phoneNumber: sales.phoneNumber,
      telephone: sales.telephone,
      fax: sales.fax,
      email: sales.email,
      code: sales.code,
      createDate: moment(sales.createDate).format("DD/MM/YYYY"),
      status: sales.status,
    },
    error: null,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<SalesOutput>>
) {
  // Koneksikan ke db
  await connect();

  // Validasi request query
  const parsedQuery = validateSalesCode(req.query);

  // Cek apakah invalid
  if (parsedQuery.error) {
    return res.status(400).json(parsedQuery);
  }

  // Cek request method dan panggil function yang sesuai
  switch (req.method) {
    case "GET":
      return await findById(parsedQuery.data.code, req, res);
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
