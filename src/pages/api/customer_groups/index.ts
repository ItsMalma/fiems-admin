import { transformZodError } from "@/libs/error";
import connect from "@/libs/mongodb";
import CustomerGroup from "@/models/CustomerGroup";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const saveSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be string",
      required_error: "Name is required",
    })
    .nonempty("Name must be not empty"),
  description: z
    .string({
      invalid_type_error: "Description must be string",
    })
    .optional(),
});

async function create(req: NextApiRequest, res: NextApiResponse) {
  const parsedBody = saveSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(401).json({
      error: transformZodError(parsedBody.error),
    });
  }

  let customerGroup = new CustomerGroup();
  customerGroup._id = (await CustomerGroup.count()) + 1;
  customerGroup.name = parsedBody.data.name;
  customerGroup.description = parsedBody.data.description;
  customerGroup.code =
    "CG" + ((await CustomerGroup.count()) + 1).toString().padStart(5, "0");

  customerGroup = await customerGroup.save();

  return res.status(201).json({
    data: {
      id: customerGroup._id,
      name: customerGroup.name,
      description: customerGroup.description,
      code: customerGroup.code,
      createDate: customerGroup.createDate,
    },
  });
}

async function findAll(req: NextApiRequest, res: NextApiResponse) {
  const customerGroups = await CustomerGroup.find();

  return res.status(200).json({
    data: customerGroups.map((customerGroup) => ({
      id: customerGroup._id,
      name: customerGroup.name,
      description: customerGroup.description,
      code: customerGroup.code,
      createDate: customerGroup.createDate,
    })),
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();

  switch (req.method) {
    case "POST":
      return await create(req, res);
    case "GET":
      return await findAll(req, res);
    default:
      return res.status(405).json({
        error: "Method not allowed",
      });
  }
}
