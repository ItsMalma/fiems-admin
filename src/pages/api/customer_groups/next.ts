import connect from "@/libs/mongodb";
import CustomerGroup from "@/models/CustomerGroup";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();

  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  return res.status(200).json({
    data:
      "CGC" + ((await CustomerGroup.count()) + 1).toString().padStart(5, "0"),
  });
}
