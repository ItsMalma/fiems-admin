import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import {
  ProductCategoryModel,
  ProductCategoryOutput,
} from "@/models/productCategory.model";
import connect from "@/libs/mongodb";
import moment from "moment";
import { validateSaveProductCategory } from "@/validations/productCategory.validation";

async function create(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<ProductCategoryOutput>>
) {
  // Validasi request body
  const parsedBody = validateSaveProductCategory(req.body);

  // Cek apakah invalid
  if (parsedBody.error) {
    return res.status(400).json(parsedBody);
  }

  // Ambil data product category terakhir
  const lastProductCategory = await ProductCategoryModel.findOne().sort({
    _id: -1,
  });

  // Buat data product category baru
  let productCategory = new ProductCategoryModel();
  productCategory._id = (lastProductCategory?._id ?? 0) + 1;
  productCategory.reff =
    "REFF" + ((lastProductCategory?._id ?? 0) + 1).toString().padStart(5, "0");
  productCategory.name = parsedBody.data.name;

  // Simpan data product category baru ke db
  productCategory = await productCategory.save();

  return res.status(201).json({
    data: {
      id: productCategory._id,
      createDate: moment(productCategory.createDate).format("DD/MM/YYYY"),
      reff: productCategory.reff,
      name: productCategory.name,
    },
    error: null,
  });
}

async function findAll(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<ProductCategoryOutput[]>>
) {
  // Ambil semua data product category dari db
  const productCategories = await ProductCategoryModel.find();

  return res.status(200).json({
    data: productCategories.map((productCategory) => ({
      id: productCategory._id,
      createDate: moment(productCategory.createDate).format("DD/MM/YYYY"),
      reff: productCategory.reff,
      name: productCategory.name,
    })),
    error: null,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    ApiResponsePayload<ProductCategoryOutput | ProductCategoryOutput[]>
  >
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
