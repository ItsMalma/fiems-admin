import { transformZodError } from "@/libs/error";
import connect from "@/libs/mongodb";
import CustomerGroup from "@/models/CustomerGroup";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const codeSchema = z.object({
  code: z.string({
    invalid_type_error: "Code must be string",
    required_error: "Code is required",
  }),
});

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

async function update(code: string, req: NextApiRequest, res: NextApiResponse) {
  let customerGroup = await CustomerGroup.findOne({ code });
  if (!customerGroup) {
    return res.status(404).json({
      error: `Customer group with code ${code} not exists`,
    });
  }

  const parsedBody = saveSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(401).json({
      error: transformZodError(parsedBody.error),
    });
  }

  customerGroup.name = parsedBody.data.name;
  customerGroup.description = parsedBody.data.description;

  customerGroup = await customerGroup.save();

  return res.status(200).json({
    data: {
      id: customerGroup._id,
      name: customerGroup.name,
      description: customerGroup.description,
      code: customerGroup.code,
      createDate: customerGroup.createDate,
    },
  });
}

async function remove(code: string, req: NextApiRequest, res: NextApiResponse) {
  let customerGroup = await CustomerGroup.findOneAndDelete({ code });
  if (!customerGroup) {
    return res.status(404).json({
      error: `Customer group with code ${code} not exists`,
    });
  }

  return res.status(200).json({
    data: {
      id: customerGroup._id,
      name: customerGroup.name,
      description: customerGroup.description,
      code: customerGroup.code,
      createDate: customerGroup.createDate,
    },
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();

  const parsedQuery = codeSchema.safeParse(req.query);
  if (!parsedQuery.success) {
    return res.status(400).json({
      error: transformZodError(parsedQuery.error),
    });
  }

  switch (req.method) {
    case "PUT":
      return await update(parsedQuery.data.code, req, res);
    case "DELETE":
      return await remove(parsedQuery.data.code, req, res);
    default:
      return res.status(405).json({
        error: "Method not allowed",
      });
  }
}
