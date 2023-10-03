import { z } from "zod";
import { saveUangJalanSchema } from "@/validations/uangJalan.validation";
import { CustomerDocument } from "./customer.model";
import { RouteDocument } from "./route.model";
import { TruckTypes, ContainerSizes } from "@/libs/utils";
import mongoose from "mongoose";

export type SaveUangJalanInput = z.infer<typeof saveUangJalanSchema>;

export type UangJalanOutput = Omit<
  UangJalan,
  "customer" | "route" | "createDate"
> & {
  id: number;
  customer: {
    code: string;
    name: string;
  };
  route: string;
  total: number;
  createDate: string;
};

export type UangJalan = {
  customer: mongoose.PopulatedDoc<CustomerDocument & number, number>;
  route: mongoose.PopulatedDoc<RouteDocument & number, number>;
  truckType: (typeof TruckTypes)[number];
  containerSize: (typeof ContainerSizes)[number];
  fuelOil: number;
  toll: number;
  labourCosts: number;
  meal: number;
  etc: number;
  createDate: Date;
  status: boolean;
};

export type UangJalanDocument = UangJalan & mongoose.Document<number>;

const UangJalanSchema = new mongoose.Schema<UangJalanDocument>(
  {
    _id: {
      type: Number,
      required: true,
    },
    customer: {
      type: Number,
      required: true,
      ref: "Customer",
    },
    route: {
      type: Number,
      required: true,
      ref: "Route",
    },
    truckType: {
      type: String,
      required: true,
      enum: TruckTypes,
    },
    containerSize: {
      type: String,
      required: true,
      enum: ContainerSizes,
    },
    fuelOil: {
      type: Number,
      required: true,
    },
    toll: {
      type: Number,
      required: true,
    },
    labourCosts: {
      type: Number,
      required: true,
    },
    meal: {
      type: Number,
      required: true,
    },
    etc: {
      type: Number,
      required: true,
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
    collection: "uangJalan",
  }
);

export const UangJalanModel =
  (mongoose.models.UangJalan as mongoose.Model<UangJalanDocument>) ||
  mongoose.model<UangJalanDocument>("UangJalan", UangJalanSchema);
