import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import { CurrencyOutput, Currencies } from "@/models/currency.model";
import fs from "fs/promises";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<CurrencyOutput>>
) {
  // Ambil data currency dari file json
  const currenciesJsonFileContent = await fs.readFile(
    path.join(process.cwd(), "json") + "/currencies.json",
    "utf-8"
  );

  try {
    // Parse data currency jadi json
    const currencies = JSON.parse(currenciesJsonFileContent) as Currencies;
  
    return res.status(200).json({
      data: currencies,
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
