import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import { ProductModel, ProductOutput } from "@/models/product.model";
import connect from "@/libs/mongodb";
import { validateProductSave } from "@/validations/product.validation";
import {
  ProductCategoryModel,
  ProductCategory,
} from "@/models/productCategory.model";
import moment from "moment";

async function create(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<ProductOutput>>
) {
  // Validasi request body
  const parsedBody = validateProductSave(req.body);

  // Cek apakah hasil validasi error
  if (parsedBody.error) {
    return res.status(400).json(parsedBody);
  }

  // Ambil data product terakhir
  const lastProduct = await ProductModel.findOne().sort({
    _id: -1,
  });

  // Buat data product baru dan isi semua datanya dengan request
  let product = new ProductModel();
  product._id = (lastProduct?.id ?? 0) + 1;
  product.type = parsedBody.data.type;
  product.skuCode =
    "SKU" + ((lastProduct?._id ?? 0) + 1).toString().padStart(5, "0");
  product.name = parsedBody.data.name;
  product.unit = parsedBody.data.unit;

  // Cek apakah tipe product adalah product
  if (product.type === "product") {
    // Ambil data product category dengan reff yang sesuai dari request
    const productCategory = await ProductCategoryModel.findOne({
      reff: parsedBody.data.category,
    });

    // Cek apakah data product category tidak ada
    if (!productCategory) {
      return res.status(404).json({
        data: null,
        error: `No product category with reff ${parsedBody.data.category}`,
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
    // Simpan data product ke db
    product = await product.save();

    return res.status(201).json({
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

async function findAll(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<ProductOutput[]>>
) {
  // Ambil semua data product dari db
  // lakukan populate untuk mengambil data product category yang bersangkutan dengan data product
  const products = await ProductModel.find().populate<{
    category?: ProductCategory;
  }>("category");

  return res.status(200).json({
    data: products.map((product) => ({
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
    })),
    error: null,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<ProductOutput | ProductOutput[]>>
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
