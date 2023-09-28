import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import { ProvinceOutput, Provinces } from "@/models/province.model";
import { validateProvinceName } from "@/validations/province.validation";
import fs from "fs/promises";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<ProvinceOutput | ProvinceOutput[]>>
) {
  // Validasi request query
  const parsedQuery = validateProvinceName(req.query);

  // Cek apakah hasil validasi error
  if (parsedQuery.error) {
    return res.status(400).json({
      data: null,
      error: parsedQuery.error,
    });
  }

  try {
    // Ambil data provinsi dari file json
    const provincesJsonFileContent = await fs.readFile(
      path.join(process.cwd(), "json") + "/provinces.json",
      "utf-8"
    );
  
    // Parse data provinsi jadi json
    const provinces = JSON.parse(provincesJsonFileContent) as Provinces;
  
    // Cek apakah ada query name
    if (parsedQuery.data.name) {
      // Cek apakah provinsi dengan nama yang sesuai dari query name tidak ada
      if (!(parsedQuery.data.name in provinces)) {
        return res.status(404).json({
          data: null,
          error: `Province with name ${parsedQuery.data.name} not exists`,
        });
      }
  
      // Dapatkan semua kota dari provinsi dengan nama yang didapat dari query name
      const cities = provinces[parsedQuery.data.name];
  
      return res.status(200).json({
        data: {
          name: parsedQuery.data.name,
          cities,
        },
        error: null,
      });
    }
  
    return res.status(200).json({
      data: Object.keys(provinces).map((provinceName) => ({
        name: provinceName,
        cities: provinces[provinceName],
      })),
      error: null,
    });
  } catch (e) {
    console.error(e);

    return res.status(500).json({
      data: null,
      error: "Internal Server Error"
    });
  }
}
