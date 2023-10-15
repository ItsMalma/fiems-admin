import connect from "@/libs/mongodb";
import { ApiResponsePayload } from "@/libs/utils";
import {
  COAModel,
  MainCOAOutput,
  mainCOADocumentToMainOutput,
} from "@/models/coa.model";
import {
  validateCOAType,
  validateSaveMainCOA,
  validateSaveSub1COA,
  validateSaveSub2COA,
} from "@/validations/coa.validation";
import lodash from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

async function createMain(
  body: unknown,
  res: NextApiResponse<ApiResponsePayload<MainCOAOutput>>
) {
  const parsedBody = validateSaveMainCOA(body);

  if (parsedBody.error) {
    return res.status(400).json(parsedBody);
  }

  const lastMainCOA = await COAModel.findOne().sort({ _id: -1 });

  let mainCOA = new COAModel({
    _id: (lastMainCOA?._id ?? 0) + 1,
    accountNumber: (lastMainCOA?.accountNumber ?? 99) + 1,
    accountName: parsedBody.data.accountName,
    accountType: parsedBody.data.accountType,
    category: parsedBody.data.category,
    transaction: parsedBody.data.transaction,
    currency: parsedBody.data.currency,
  });

  mainCOA = await mainCOA.save();

  return res.status(201).json({
    data: mainCOADocumentToMainOutput(mainCOA),
    error: null,
  });
}

async function createSub1(
  body: unknown,
  res: NextApiResponse<ApiResponsePayload<MainCOAOutput>>
) {
  const parsedBody = validateSaveSub1COA(body);

  if (parsedBody.error) {
    return res.status(400).json(parsedBody);
  }

  let mainCOA = await COAModel.findOne({
    accountNumber: parsedBody.data.main,
  });

  if (!mainCOA) {
    return res.status(404).json({
      data: null,
      error: `Main COA with account number ${parsedBody.data.main} not exists`,
    });
  }

  const lastSub1COA = lodash.last(mainCOA.subs);

  mainCOA.subs.push({
    accountNumber: (lastSub1COA?.accountNumber ?? 0) + 1,
    description: parsedBody.data.description,
    subs: [],
  });

  mainCOA = await mainCOA.save();

  return res.status(201).json({
    data: mainCOADocumentToMainOutput(mainCOA),
    error: null,
  });
}

async function createSub2(
  body: unknown,
  res: NextApiResponse<ApiResponsePayload<MainCOAOutput>>
) {
  const parsedBody = validateSaveSub2COA(body);

  if (parsedBody.error) {
    return res.status(400).json(parsedBody);
  }

  let mainCOA = await COAModel.findOne({
    accountNumber: parsedBody.data.main,
  });

  if (!mainCOA) {
    return res.status(404).json({
      data: null,
      error: `Main COA with account number ${parsedBody.data.main} not exists`,
    });
  }

  const sub1COAIndex = mainCOA.subs.findIndex(
    (sub1) => sub1.accountNumber === parsedBody.data.sub1
  );
  if (sub1COAIndex === -1) {
    return res.status(404).json({
      data: null,
      error: `Sub 1 COA with account number ${parsedBody.data.sub1} not exists on main coa ${parsedBody.data.main}`,
    });
  }

  const sub1COA = mainCOA.subs[sub1COAIndex];

  const lastSub2COA = lodash.last(sub1COA.subs);

  sub1COA.subs.push({
    accountNumber: (lastSub2COA?.accountNumber ?? 0) + 1,
    description: parsedBody.data.description,
  });

  mainCOA.subs[sub1COAIndex] = sub1COA;

  mainCOA = await mainCOA.save();

  return res.status(201).json({
    data: mainCOADocumentToMainOutput(mainCOA),
    error: null,
  });
}

async function create(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<MainCOAOutput>>
) {
  const type = validateCOAType(req.body);

  if (type.error) {
    return res.status(400).json(type);
  }

  switch (type.data.type) {
    case "main":
      return await createMain(req.body, res);
    case "sub1":
      return await createSub1(req.body, res);
    case "sub2":
      return await createSub2(req.body, res);
  }
}

export async function findAll(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<MainCOAOutput[]>>
) {
  const coas = await COAModel.find();

  return res.status(200).json({
    data: coas.map((mainCOA) => mainCOADocumentToMainOutput(mainCOA)),
    error: null,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<MainCOAOutput | MainCOAOutput[]>>
) {
  await connect();

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
