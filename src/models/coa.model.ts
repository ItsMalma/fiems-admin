import {
  saveMainCOASchema,
  saveSub1COASchema,
  saveSub2COASchema,
} from "@/validations/coa.validation";
import moment from "moment";
import mongoose from "mongoose";
import { z } from "zod";

export function formatCOANumber(
  mainNumber: number,
  sub1Number?: number,
  sub2Number?: number
): string {
  let coaNumber = mainNumber.toString().padStart(3, "0");
  if (sub1Number !== undefined) {
    coaNumber += "." + sub1Number.toString().padStart(2, "0");
  }
  if (sub2Number !== undefined) {
    coaNumber += "." + sub2Number.toString().padStart(2, "0");
  }

  return coaNumber;
}

export function unformatCOANumber(coaNumber: string): {
  mainNumber: number;
  sub1Number?: number;
  sub2Number?: number;
} {
  const splittedCOANumber = coaNumber.split(".");

  if (splittedCOANumber.length < 1) {
    throw new Error(`${coaNumber} is not valid COA number`);
  }

  if (splittedCOANumber.length === 1) {
    const mainNumber = Number(splittedCOANumber[0]);
    if (isNaN(mainNumber)) {
      throw new Error(`${coaNumber} is not valid COA number`);
    }

    return {
      mainNumber,
    };
  } else if (splittedCOANumber.length === 2) {
    const mainNumber = Number(splittedCOANumber[0]);
    if (isNaN(mainNumber)) {
      throw new Error(`${coaNumber} is not valid COA number`);
    }

    const sub1Number = Number(splittedCOANumber[1]);
    if (isNaN(sub1Number)) {
      throw new Error(`${coaNumber} is not valid COA number`);
    }

    return {
      mainNumber,
      sub1Number,
    };
  } else if (splittedCOANumber.length === 3) {
    const mainNumber = Number(splittedCOANumber[0]);
    if (isNaN(mainNumber)) {
      throw new Error(`${coaNumber} is not valid COA number`);
    }

    const sub1Number = Number(splittedCOANumber[1]);
    if (isNaN(sub1Number)) {
      throw new Error(`${coaNumber} is not valid COA number`);
    }

    const sub2Number = Number(splittedCOANumber[2]);
    if (isNaN(sub2Number)) {
      throw new Error(`${coaNumber} is not valid COA number`);
    }

    return {
      mainNumber,
      sub1Number,
      sub2Number,
    };
  }

  throw new Error(`${coaNumber} is not valid COA number`);
}

export function mainCOADocumentToMainOutput(
  mainModel: MainCOADocument
): MainCOAOutput {
  return {
    id: mainModel._id ?? 0,
    accountName: mainModel.accountName,
    accountNumber: mainModel.accountNumber,
    accountType: mainModel.accountType,
    category: mainModel.category,
    transaction: mainModel.transaction,
    currency: mainModel.currency,
    subs: mainModel.subs,
    createDate: moment(mainModel.createDate).format("DD/MM/YYYY"),
  };
}
export function mainCOADocumentToOutput(mainModel: MainCOADocument): COAOutput {
  return {
    id: mainModel._id ?? 0,
    main: {
      accountNumber: mainModel.accountNumber,
      accountName: mainModel.accountName,
    },
    accountType: mainModel.accountType,
    category: mainModel.category,
    transaction: mainModel.transaction,
    currency: mainModel.currency,
    createDate: moment(mainModel.createDate).format("DD/MM/YYYY"),
  };
}
export function sub1COADocumentToOutput(
  sub1Model: Sub1COADocument,
  mainModel: MainCOADocument
): COAOutput {
  return {
    id: mainModel._id ?? 0,
    main: {
      accountNumber: mainModel.accountNumber,
      accountName: mainModel.accountName,
    },
    sub1: {
      accountNumber: sub1Model.accountNumber,
      description: sub1Model.description,
    },
    accountType: mainModel.accountType,
    category: mainModel.category,
    transaction: mainModel.transaction,
    currency: mainModel.currency,
    createDate: moment(mainModel.createDate).format("DD/MM/YYYY"),
  };
}
export function sub2COADocumentToOutput(
  sub2Model: Sub2COADocument,
  sub1Model: Sub1COADocument,
  mainModel: MainCOADocument
): COAOutput {
  return {
    id: mainModel._id ?? 0,
    main: {
      accountNumber: mainModel.accountNumber,
      accountName: mainModel.accountName,
    },
    sub1: {
      accountNumber: sub1Model.accountNumber,
      description: sub1Model.description,
    },
    sub2: {
      accountNumber: sub2Model.accountNumber,
      description: sub2Model.description,
    },
    accountType: mainModel.accountType,
    category: mainModel.category,
    transaction: mainModel.transaction,
    currency: mainModel.currency,
    createDate: moment(mainModel.createDate).format("DD/MM/YYYY"),
  };
}

export type SaveCOAInput =
  | ({ type: "main" } & z.infer<typeof saveMainCOASchema>)
  | ({ type: "sub1" } & z.infer<typeof saveSub1COASchema>)
  | ({ type: "sub2" } & z.infer<typeof saveSub2COASchema>);

export type COAOutput = {
  id: number;
  main: {
    accountNumber: number;
    accountName: string;
  };
  sub1?: {
    accountNumber: number;
    description: string;
  };
  sub2?: {
    accountNumber: number;
    description: string;
  };
  accountType: string;
  category: string;
  transaction: string;
  currency: string;
  createDate: string;
};
export type MainCOAOutput = Omit<MainCOA, "createDate"> & {
  id: number;
  createDate: string;
};
export function normalizeMainOutput(main: MainCOAOutput): COAOutput[] {
  const outputs: COAOutput[] = [
    {
      id: main.id,
      main: {
        accountNumber: main.accountNumber,
        accountName: main.accountName,
      },
      accountType: main.accountType,
      category: main.category,
      transaction: main.transaction,
      currency: main.currency,
      createDate: main.createDate,
    },
  ];

  main.subs.forEach((sub1) => {
    outputs.push(
      {
        id: main.id,
        main: {
          accountNumber: main.accountNumber,
          accountName: main.accountName,
        },
        sub1: {
          accountNumber: sub1.accountNumber,
          description: sub1.description,
        },
        accountType: main.accountType,
        category: main.category,
        transaction: main.transaction,
        currency: main.currency,
        createDate: main.createDate,
      },
      ...sub1.subs.map((sub2) => ({
        id: main.id,
        main: {
          accountNumber: main.accountNumber,
          accountName: main.accountName,
        },
        sub1: {
          accountNumber: sub1.accountNumber,
          description: sub1.description,
        },
        sub2: {
          accountNumber: sub2.accountNumber,
          description: sub2.description,
        },
        accountType: main.accountType,
        category: main.category,
        transaction: main.transaction,
        currency: main.currency,
        createDate: main.createDate,
      }))
    );
  });

  return outputs;
}

export type Sub2COA = {
  accountNumber: number;
  description: string;
};
export type Sub1COA = {
  accountNumber: number;
  description: string;
  subs: Sub2COA[];
};
export type MainCOA = {
  accountNumber: number;
  accountName: string;
  accountType: string;
  category: string;
  transaction: string;
  currency: string;
  subs: Sub1COA[];
  createDate: Date;
};

export type MainCOADocument = MainCOA & mongoose.Document<number>;
export type Sub1COADocument = Sub1COA;
export type Sub2COADocument = Sub2COA;

const Sub2COASchema = new mongoose.Schema<Sub2COADocument>(
  {
    accountNumber: {
      type: Number,
      required: true,
      index: true,
      unique: true,
      sparse: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);
const Sub1COASchema = new mongoose.Schema<Sub1COADocument>(
  {
    accountNumber: {
      type: Number,
      required: true,
      index: true,
      unique: true,
      sparse: true,
    },
    description: {
      type: String,
      required: true,
    },
    subs: [
      {
        type: Sub2COASchema,
        required: true,
        default: [],
      },
    ],
  },
  { _id: false }
);
const MainCOASchema = new mongoose.Schema<MainCOADocument>({
  _id: {
    type: Number,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
    index: true,
    unique: true,
    sparse: true,
  },
  accountName: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  transaction: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  subs: [
    {
      type: Sub1COASchema,
      required: true,
      default: [],
    },
  ],
  createDate: {
    type: Date,
    required: true,
    default: () => new Date(),
  },
});

export const COAModel =
  (mongoose.models?.COA as mongoose.Model<MainCOADocument> | undefined) ??
  mongoose.model<MainCOADocument>("COA", MainCOASchema);
