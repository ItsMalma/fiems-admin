import mongoose from "mongoose";
import { CustomerType } from "@/libs/utils";
import { CustomerGroupDocument } from "./customerGroup.model";
import { z } from "zod";
import { saveCustomerSchema } from "@/validations/customer.validation";

export type SaveCustomerInput = z.infer<typeof saveCustomerSchema>;

export type CustomerOutput = {
  id: number;
  createDate: string;
  code: string;
  type: (typeof CustomerType)[number];
  name: string;
  group: string;
  address: string;
  city: string;
  province: string;
  telephone: string;
  fax: string;
  email: string;
  top: number;
  currency: string;
  pic: {
    purchasing: CustomerPic;
    operation: CustomerPic;
    finance: CustomerPic;
  };
  status: boolean;
};

export type CustomerPic = {
  name: string;
  email: string;
  phoneNumber: string;
  telephone: string;
  fax: string;
};

const CustomerPicSchema = new mongoose.Schema<CustomerPic>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
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
  },
  { _id: false }
);

export type Customer = {
  type: (typeof CustomerType)[number];
  name: string;
  group: mongoose.PopulatedDoc<CustomerGroupDocument & number, number>;
  address: string;
  city: string;
  province: string;
  telephone: string;
  fax: string;
  email: string;
  top: number;
  currency: string;
  pic: {
    purchasing: CustomerPic;
    operation: CustomerPic;
    finance: CustomerPic;
  };
  code: string;
  createDate: Date;
  status: boolean;
};

export type CustomerDocument = Customer & mongoose.Document<number>;

const CustomerSchema = new mongoose.Schema<CustomerDocument>(
  {
    _id: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: CustomerType,
    },
    name: {
      type: String,
      required: true,
    },
    group: {
      type: Number,
      ref: "CustomerGroup",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
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
    top: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    pic: {
      type: {
        purchasing: {
          type: CustomerPicSchema,
          required: true,
          _id: false,
        },
        operation: {
          type: CustomerPicSchema,
          required: true,
          _id: false,
        },
        finance: {
          type: CustomerPicSchema,
          required: true,
          _id: false,
        },
      },
      required: true,
      _id: false,
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
    collection: "customers",
  }
);

export const CustomerModel =
  (mongoose.models.Customer as mongoose.Model<CustomerDocument>) ||
  mongoose.model<CustomerDocument>("Customer", CustomerSchema);
