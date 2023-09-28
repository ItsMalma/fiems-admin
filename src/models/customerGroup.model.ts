import mongoose from "mongoose";
import { z } from "zod";
import { saveCustomerGroupSchema } from "@/validations/customerGroup.validation";

export type SaveCustomerGroupInput = z.infer<typeof saveCustomerGroupSchema>;

export type CustomerGroupOutput = {
  id: number;
  createDate: string;
  code: string;
  name: string;
  description?: string;
};

export type CustomerGroup = {
  name: string;
  description?: string;
  code: string;
  createDate: Date;
};

export type CustomerGroupDocument = CustomerGroup & mongoose.Document<number>;

const CustomerGroupSchema = new mongoose.Schema<CustomerGroupDocument>(
  {
    _id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please enter the customer group name"],
    },
    description: {
      type: String,
      required: false,
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
  },
  {
    collection: "customerGroups",
  }
);

export const CustomerGroupModel =
  (mongoose.models.CustomerGroup as mongoose.Model<CustomerGroupDocument>) ||
  mongoose.model<CustomerGroupDocument>("CustomerGroup", CustomerGroupSchema);
