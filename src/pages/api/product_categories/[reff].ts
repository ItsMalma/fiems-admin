import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import {
  ProductCategoryModel,
  ProductCategoryOutput,
} from "@/models/productCategory.model";
import connect from "@/libs/mongodb";
import moment from "moment";
import {
  validateSaveProductCategory,
  validateProductCategoryReff,
} from "@/validations/productCategory.validation";

async function update(
  reff: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<ProductCategoryOutput>>
) {
  // Ambil product category dari db dengan reff yang di request
  let productCategory = await ProductCategoryModel.findOne({ reff });

  // Cek apakah product category tidak ada
  if (!productCategory) {
    return res.status(404).json({
      data: null,
      error: `Product category with reff ${reff} not exists`,
    });
  }

  // Validasi request body
  const parsedBody = validateSaveProductCategory(req.body);

  // Cek apakah validasi tidak sukses
  if (parsedBody.error) {
    return res.status(400).json(parsedBody);
  }

  // Ubah data product category dari db dengan request
  productCategory.name = parsedBody.data.name;

  // Simpan data product category yang telah diubah ke db
  productCategory = await productCategory.save();

  return res.status(200).json({
    data: {
      id: productCategory._id,
      createDate: moment(productCategory.createDate).format("DD/MM/YYYY"),
      reff: productCategory.reff,
      name: productCategory.name,
    },
    error: null,
  });
}

async function remove(
  reff: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<ProductCategoryOutput>>
) {
  // Ambil product category dari db dengan reff yang di request dan hapus kalau ketemu
  const productCategory = await ProductCategoryModel.findOneAndDelete({ reff });

  // Cek apakah product category tidak ada
  if (!productCategory) {
    return res.status(404).json({
      data: null,
      error: `Product category with reff ${reff} not exists`,
    });
  }

  return res.status(200).json({
    data: {
      id: productCategory._id,
      createDate: moment(productCategory.createDate).format("DD/MM/YYYY"),
      reff: productCategory.reff,
      name: productCategory.name,
    },
    error: null,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<ProductCategoryOutput>>
) {
  // Koneksikan ke db
  await connect();

  // Validasi query
  const parsedQuery = validateProductCategoryReff(req.query);

  // Cek apakah validasi query error
  if (parsedQuery.error) {
    return res.status(400).json(parsedQuery);
  }

  // Cek method apa yang direquest dan panggil function yang sesuai
  switch (req.method) {
    case "PUT":
      return await update(parsedQuery.data.reff, req, res);
    case "DELETE":
      return await remove(parsedQuery.data.reff, req, res);
    default:
      return res.status(405).json({
        data: null,
        error: "Method not allowed",
      });
  }
}
