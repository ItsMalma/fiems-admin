import mongoose from "mongoose";
import { JobPositions } from "@/libs/utils";
import { z } from "zod";
import { saveSalesSchema } from "@/validations/sales.validation";

export type SaveSalesInput = z.infer<typeof saveSalesSchema>;

export type SalesOutput = {
  id: number;
  createDate: string;
  code: string;
  jobPosition: (typeof JobPositions)[number];
  name: string;
  nik: string;
  cabang: string;
  phoneNumber: string;
  telephone: string;
  fax: string;
  email: string;
  status: boolean;
};

export type Sales = {
  jobPosition: (typeof JobPositions)[number];
  name: string;
  nik: string;
  cabang: string;
  phoneNumber: string;
  telephone: string;
  fax: string;
  email: string;
  code: string;
  createDate: Date;
  status: boolean;
};

export type SalesDocument = Sales & mongoose.Document<number>;

const SalesSchema = new mongoose.Schema<SalesDocument>(
  {
    _id: {
      type: Number,
      required: true,
    },
    jobPosition: {
      type: String,
      required: true,
      enum: JobPositions,
    },
    name: {
      type: String,
      required: true,
    },
    nik: {
      type: String,
      required: true,
    },
    cabang: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    fax: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    createDate: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  {
    collection: "sales",
  }
);

export const SalesModel =
  (mongoose.models.Sales as mongoose.Model<SalesDocument>) ||
  mongoose.model<SalesDocument>("Sales", SalesSchema);
