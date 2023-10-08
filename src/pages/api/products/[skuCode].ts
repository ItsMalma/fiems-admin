import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import { ProductOutput, ProductModel } from "@/models/product.model";
import connect from "@/libs/mongodb";
import {
  validateProductSKUCode,
  validateProductSave,
} from "@/validations/product.validation";
import moment from "moment";
import {
  ProductCategory,
  ProductCategoryModel,
} from "@/models/productCategory.model";

async function findBySKUCode(
  skuCode: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<ProductOutput>>
) {
  // Ambil data product dari db dengan sku code yang sesuai di request
  // lakukan populate untuk mengambil data product category yang bersangkutan dengan data product
  const product = await ProductModel.findOne({
    skuCode,
  }).populate<{ category?: ProductCategory }>("category");

  // Cek apakah data product tidak ada
  if (!product) {
    return res.status(404).json({
      data: null,
      error: `Product with sku code ${skuCode} not exists`,
    });
  }

  return res.status(200).json({
    data: {
      id: product.id,
      type: product.type,
      skuCode: product.skuCode,
      category: product.category
        ? {
            reff: product.category.reff,
            name: product.category.name,
          }
        : undefined,
      name: product.name,
      unit: product.unit,
      createDate: moment(product.createDate).format("DD/MM/YYYY"),
    },
    error: null,
  });
}

async function update(
  skuCode: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<ProductOutput>>
) {
  // Ambil data product dari db dengan sku code yang sesuai di request
  let product = await ProductModel.findOne({ skuCode });

  // Cek apakah data product tidak ada
  if (!product) {
    return res.status(404).json({
      data: null,
      error: `Product with sku code ${skuCode} not exists`,
    });
  }

  // Validasi request body
  const parsedBody = validateProductSave(req.body);

  // Cek apakah request body invalid
  if (parsedBody.error) {
    return res.status(401).json(parsedBody);
  }

  // Ubah data product yang diambil dari db barusan dengan request
  product.name = parsedBody.data.name;
  product.unit = parsedBody.data.unit;

  // Cek apakah tipe product diubah dan tipe yang barunya adalah product
  if (
    parsedBody.data.type !== product.type &&
    parsedBody.data.type === "product"
  ) {
    // Ubah tipe product
    product.type = parsedBody.data.type;

    // Ambil data product category dengan reff yang sesuai dari request
    const productCategory = await ProductCategoryModel.findOne({
      reff: parsedBody.data.category,
    });

    // Cek apakah data product category tidak ada
    if (!productCategory) {
      return res.status(404).json({
        data: null,
        error: `Product category with reff ${parsedBody.data.category} not exists`,
      });
    }

    // Set category product
    product.category = productCategory._id;

    // Simpan data product ke db
    product = await product.save();

    return res.status(201).json({
      data: {
        id: product.id,
        type: product.type,
        skuCode: product.skuCode,
        category: {
          reff: productCategory.reff,
          name: productCategory.name,
        },
        name: product.name,
        unit: product.unit,
        createDate: moment(product.createDate).format("DD/MM/YYYY"),
      },
      error: null,
    });
  } else {
    // Simpan data product yang baru ke db
    product = await product.save();

    return res.status(200).json({
      data: {
        id: product.id,
        type: product.type,
        skuCode: product.skuCode,
        name: product.name,
        unit: product.unit,
        createDate: moment(product.createDate).format("DD/MM/YYYY"),
      },
      error: null,
    });
  }
}

async function remove(
  skuCode: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<ProductOutput>>
) {
  // Ambil data product dari db dengan code yang sesuai di request lalu hapus jika ketemu
  // lakukan populate untuk mendapatkan juga data product category yang terkait
  const product = await ProductModel.findOneAndDelete({
    skuCode,
  }).populate<{
    category?: ProductCategory;
  }>("category");

  // Cek apakah product tidak ada
  if (!product) {
    return res.status(404).json({
      data: null,
      error: `Product with sku code ${skuCode} not exists`,
    });
  }

  return res.status(200).json({
    data: {
      id: product.id,
      type: product.type,
      skuCode: product.skuCode,
      category: product.category
        ? {
            reff: product.category.reff,
            name: product.category.name,
          }
        : undefined,
      name: product.name,
      unit: product.unit,
      createDate: moment(product.createDate).format("DD/MM/YYYY"),
    },
    error: null,
  });
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<ProductOutput>>
) {
  // Koneksikan ke db
  await connect();

  // Validasi request query
  const parsedQuery = validateProductSKUCode(req.query);

  // Cek apakah invalid
  if (parsedQuery.error) {
    return res.status(400).json(parsedQuery);
  }

  // Cek request method dan panggil function yang sesuai
  switch (req.method) {
    case "GET":
      return await findBySKUCode(parsedQuery.data.skuCode, req, res);
    case "PUT":
      return await update(parsedQuery.data.skuCode, req, res);
    case "DELETE":
      return await remove(parsedQuery.data.skuCode, req, res);
    default:
      return res.status(405).json({
        data: null,
        error: "Method not allowed",
      });
  }
}
