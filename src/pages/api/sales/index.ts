import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import { SalesModel, SalesOutput } from "@/models/sales.model";
import connect from "@/libs/mongodb";
import moment from "moment";
import { validateSalesSave } from "@/validations/sales.validation";

async function create(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<SalesOutput>>
) {
  // Validasi request body
  const parsedBody = validateSalesSave(req.body);

  // Cek apakah hasil validasi error
  if (parsedBody.error) {
    return res.status(400).json(parsedBody);
  }

  // Ambil data sales terakhir
  const lastSales = await SalesModel.findOne().sort({
    _id: -1,
  });

  // Buat data sales baru dan isi semua datanya dengan request
  let sales = new SalesModel();
  sales._id = (lastSales?._id ?? 0) + 1;
  sales.code = "SLS" + ((lastSales?._id ?? 0) + 1).toString().padStart(5, "0");
  sales.jobPosition = parsedBody.data.jobPosition;
  sales.name = parsedBody.data.name;
  sales.nik = parsedBody.data.nik;
  sales.cabang = parsedBody.data.cabang;
  sales.phoneNumber = parsedBody.data.phoneNumber;
  sales.telephone = parsedBody.data.telephone;
  sales.fax = parsedBody.data.fax;
  sales.email = parsedBody.data.email;
  sales.status = true;

  // Simpan data sales ke db
  sales = await sales.save();

  return res.status(201).json({
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

async function findAll(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<SalesOutput[]>>
) {
  // Ambil semua data sales dari db
  const listSales = await SalesModel.find();

  return res.status(200).json({
    data: listSales.map((sales) => ({
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
    })),
    error: null,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<SalesOutput | SalesOutput[]>>
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
