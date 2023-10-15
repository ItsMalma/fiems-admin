import connect from "@/libs/mongodb";
import { ApiResponsePayload } from "@/libs/utils";
import {
  COAModel,
  COAOutput,
  MainCOAOutput,
  mainCOADocumentToMainOutput,
  mainCOADocumentToOutput,
  sub1COADocumentToOutput,
  sub2COADocumentToOutput,
  unformatCOANumber,
} from "@/models/coa.model";
import {
  validateCOANumber,
  validateFindQuery,
  validateSaveMainCOA,
  validateSaveSub1COA,
  validateSaveSub2COA,
} from "@/validations/coa.validation";
import lodash from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

async function findByNumber(
  number: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<MainCOAOutput | COAOutput>>
) {
  const { mainNumber, sub1Number, sub2Number } = unformatCOANumber(number);

  // Validasi request query
  const parsedQuery = validateFindQuery(req.query);

  // Cek apakah invalid
  if (parsedQuery.error) {
    return res.status(400).json(parsedQuery);
  }

  const mainCOA = await COAModel.findOne({
    accountNumber: mainNumber,
  });
  if (!mainCOA) {
    return res.status(404).json({
      data: null,
      error: `COA with account number ${mainNumber} not exists`,
    });
  }

  if (sub1Number !== undefined) {
    const sub1COA = mainCOA.subs.find(
      (sub1) => sub1.accountNumber === sub1Number
    );
    if (!sub1COA) {
      return res.status(404).json({
        data: null,
        error: `Sub 1 COA with account number ${sub1Number} not exists on main coa ${mainCOA.accountNumber}`,
      });
    }

    if (sub2Number !== undefined) {
      const sub2COA = sub1COA.subs.find(
        (sub2) => sub2.accountNumber === sub2Number
      );
      if (!sub2COA) {
        return res.status(404).json({
          data: null,
          error: `Sub 2 COA with account number ${sub2Number} not exists on sub 1 ${sub1COA.accountNumber} on main coa ${mainCOA.accountNumber}`,
        });
      }

      return res.status(200).json({
        data: sub2COADocumentToOutput(sub2COA, sub1COA, mainCOA),
        error: null,
      });
    }

    return res.status(200).json({
      data: sub1COADocumentToOutput(sub1COA, mainCOA),
      error: null,
    });
  }

  if (parsedQuery.data.simple) {
    return res.status(200).json({
      data: mainCOADocumentToOutput(mainCOA),
      error: null,
    });
  }

  return res.status(200).json({
    data: mainCOADocumentToMainOutput(mainCOA),
    error: null,
  });
}

async function update(
  number: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<MainCOAOutput>>
) {
  const { mainNumber, sub1Number, sub2Number } = unformatCOANumber(number);

  let mainCOA = await COAModel.findOne({
    accountNumber: mainNumber,
  });
  if (!mainCOA) {
    return res.status(404).json({
      data: null,
      error: `COA with account number ${mainNumber} not exists`,
    });
  }

  if (sub1Number !== undefined) {
    let sub1COAIndex = mainCOA.subs.findIndex(
      (sub1) => sub1.accountNumber === sub1Number
    );
    if (sub1COAIndex === -1) {
      return res.status(404).json({
        data: null,
        error: `Sub 1 COA with account number ${sub1Number} not exists on main coa ${mainCOA.accountNumber}`,
      });
    }

    let sub1COA = mainCOA.subs[sub1COAIndex];

    if (sub2Number !== undefined) {
      // UPDATE SUB 2
      const parsedBody = validateSaveSub2COA(req.body);

      if (parsedBody.error) {
        return res.status(400).json(parsedBody);
      }

      let sub2COAIndex = sub1COA.subs.findIndex(
        (sub2) => sub2.accountNumber === sub2Number
      );
      if (sub2COAIndex === -1) {
        return res.status(404).json({
          data: null,
          error: `Sub 2 COA with account number ${sub2Number} not exists on sub 1 ${sub1COA.accountNumber} on main coa ${mainCOA.accountNumber}`,
        });
      }

      let sub2COA = sub1COA.subs[sub2COAIndex];
      sub2COA.description = parsedBody.data.description;

      if (parsedBody.data.main !== mainCOA.accountNumber) {
        // UPDATE SUB 2 JIKA MAIN COA DIUBAH
        sub1COA.subs.splice(sub2COAIndex, 1);
        mainCOA.subs[sub1COAIndex] = sub1COA;
        mainCOA = await mainCOA.save();

        mainCOA = await COAModel.findOne({
          accountNumber: parsedBody.data.main,
        });

        if (!mainCOA) {
          return res.status(404).json({
            data: null,
            error: `Main COA with account number ${parsedBody.data.main} not exists`,
          });
        }

        sub1COAIndex = mainCOA.subs.findIndex(
          (sub1) => sub1.accountNumber === parsedBody.data.sub1
        );
        if (sub1COAIndex === -1) {
          return res.status(404).json({
            data: null,
            error: `Sub 1 COA with account number ${parsedBody.data.sub1} not exists on main coa ${mainCOA.accountNumber}`,
          });
        }

        sub1COA = mainCOA.subs[sub1COAIndex];

        const lastSub2COA = lodash.last(sub1COA.subs);

        sub2COA.accountNumber = (lastSub2COA?.accountNumber ?? 0) + 1;

        sub1COA.subs.push(lodash.toPlainObject(sub2COA));
      } else if (parsedBody.data.sub1 !== sub1COA.accountNumber) {
        // UPDATE SUB 2 JIKA SUB 1 COA DIUBAH
        sub1COAIndex = mainCOA.subs.findIndex(
          (sub1) => sub1.accountNumber === parsedBody.data.sub1
        );
        if (sub1COAIndex === -1) {
          return res.status(404).json({
            data: null,
            error: `Sub 1 COA with account number ${parsedBody.data.sub1} not exists on main coa ${mainCOA.accountNumber}`,
          });
        }

        sub1COA.subs.splice(sub2COAIndex, 1);

        sub1COA = mainCOA.subs[sub1COAIndex];

        const lastSub2COA = lodash.last(sub1COA.subs);

        sub2COA.accountNumber = (lastSub2COA?.accountNumber ?? 0) + 1;

        sub1COA.subs.push(lodash.toPlainObject(sub2COA));
      } else {
        // UPDATE SUB 2 JIKA MAIN COA DAN SUB 1 COA TIDAK DIUBAH
        sub1COA.subs[sub2COAIndex] = sub2COA;
      }

      mainCOA.subs[sub1COAIndex] = sub1COA;
    } else {
      // UPDATE SUB 1
      const parsedBody = validateSaveSub1COA(req.body);

      if (parsedBody.error) {
        return res.status(400).json(parsedBody);
      }

      sub1COA.description = parsedBody.data.description;

      if (parsedBody.data.main !== mainCOA.accountNumber) {
        // UPDATE SUB 1 JIKA MAIN COA DIUBAH JUGA
        mainCOA.subs.splice(sub1COAIndex, 1);

        mainCOA = await mainCOA.save();

        mainCOA = await COAModel.findOne({
          accountNumber: parsedBody.data.main,
        });

        if (!mainCOA) {
          return res.status(404).json({
            data: null,
            error: `Main COA with account number ${parsedBody.data.main} not exists`,
          });
        }

        const lastSub1COA = lodash.last(mainCOA.subs);

        sub1COA.accountNumber = (lastSub1COA?.accountNumber ?? 0) + 1;

        mainCOA.subs.push(lodash.toPlainObject(sub1COA));
      } else {
        mainCOA.subs[sub1COAIndex] = sub1COA;
      }
    }
  } else {
    const parsedBody = validateSaveMainCOA(req.body);

    if (parsedBody.error) {
      return res.status(400).json(parsedBody);
    }

    mainCOA.accountName = parsedBody.data.accountName;
    mainCOA.accountType = parsedBody.data.accountType;
    mainCOA.category = parsedBody.data.category;
    mainCOA.transaction = parsedBody.data.transaction;
    mainCOA.currency = parsedBody.data.currency;
  }

  mainCOA = await mainCOA.save();

  return res.status(200).json({
    data: mainCOADocumentToMainOutput(mainCOA),
    error: null,
  });
}

async function remove(
  number: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<MainCOAOutput>>
) {
  const { mainNumber, sub1Number, sub2Number } = unformatCOANumber(number);

  let mainCOA = await COAModel.findOne({
    accountNumber: mainNumber,
  });
  if (!mainCOA) {
    return res.status(404).json({
      data: null,
      error: `COA with account number ${mainNumber} not exists`,
    });
  }

  if (sub1Number !== undefined) {
    const sub1COAIndex = mainCOA.subs.findIndex(
      (sub1) => sub1.accountNumber === sub1Number
    );
    if (sub1COAIndex === -1) {
      return res.status(404).json({
        data: null,
        error: `Sub 1 COA with account number ${sub1Number} not exists on main coa ${mainCOA.accountNumber}`,
      });
    }

    const sub1COA = mainCOA.subs[sub1COAIndex];

    if (sub2Number !== undefined) {
      const sub2COAIndex = sub1COA.subs.findIndex(
        (sub2) => sub2.accountNumber === sub2Number
      );
      if (sub2COAIndex === -1) {
        return res.status(404).json({
          data: null,
          error: `Sub 2 COA with account number ${sub2Number} not exists on sub 1 ${sub1COA.accountNumber} on main coa ${mainCOA.accountNumber}`,
        });
      }

      sub1COA.subs.splice(sub2COAIndex, 1);
      mainCOA.subs[sub1COAIndex] = sub1COA;
    } else {
      mainCOA.subs.splice(sub1COAIndex, 1);
    }

    mainCOA = await mainCOA.save();
  } else {
    await COAModel.deleteOne({
      _id: mainCOA._id,
    });
  }

  return res.status(200).json({
    data: mainCOADocumentToMainOutput(mainCOA),
    error: null,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<COAOutput | MainCOAOutput>>
) {
  // Koneksikan ke db
  await connect();

  // Validasi request query
  const parsedQuery = validateCOANumber(req.query);

  // Cek apakah invalid
  if (parsedQuery.error) {
    return res.status(400).json(parsedQuery);
  }

  // Cek request method dan panggil function yang sesuai
  switch (req.method) {
    case "GET":
      return await findByNumber(parsedQuery.data.number, req, res);
    case "PUT":
      return await update(parsedQuery.data.number, req, res);
    case "DELETE":
      return await remove(parsedQuery.data.number, req, res);
    default:
      return res.status(405).json({
        data: null,
        error: "Method not allowed",
      });
  }
}
