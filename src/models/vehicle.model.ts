import { z } from "zod";
import { saveVehicleSchema } from "@/validations/vehicle.validation";
import { CustomerDocument, CustomerOutput } from "./customer.model";
import { TruckTypes, Cylinders } from "@/libs/utils";
import mongoose from "mongoose";

export type SaveVehicleInput = z.infer<typeof saveVehicleSchema>;

export type VehicleOutput = Omit<
  Vehicle,
  "vendor" | "stnkExpired" | "taxExpired" | "keurExpired" | "createDate"
> & {
  id: number;
  vendor: {
    code: string;
    name: string;
  };
  stnkExpired: string;
  taxExpired: string;
  keurExpired: string;
  createDate: string;
};

export type Vehicle = {
  vendor: mongoose.PopulatedDoc<CustomerDocument & number, number>;
  truckNumber: string;
  brand: string;
  truckType: (typeof TruckTypes)[number];
  engineNumber: string;
  chassisNumber: string;
  cylinder: (typeof Cylinders)[number];
  color: string;
  stnkExpired: Date;
  taxExpired: Date;
  keurExpired: Date;
  createDate: Date;
  status: boolean;
};

export type VehicleDocument = Vehicle & mongoose.Document<number>;

const VehicleSchema = new mongoose.Schema<VehicleDocument>(
  {
    _id: {
      type: Number,
      required: true,
    },
    vendor: {
      type: Number,
      ref: "Customer",
      required: true,
    },
    truckNumber: {
      type: String,
      required: true,
      unique: true,
    },
    brand: {
      type: String,
      required: true,
    },
    truckType: {
      type: String,
      required: true,
      enum: TruckTypes,
    },
    engineNumber: {
      type: String,
      required: true,
    },
    chassisNumber: {
      type: String,
      required: true,
    },
    cylinder: {
      type: Number,
      required: true,
      enum: Cylinders,
    },
    color: {
      type: String,
      required: true,
    },
    stnkExpired: {
      type: Date,
      required: true,
    },
    taxExpired: {
      type: Date,
      required: true,
    },
    keurExpired: {
      type: Date,
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
    collection: "vehicles",
  }
);

export const VehicleModel =
  (mongoose.models.Vehicle as mongoose.Model<VehicleDocument>) ||
  mongoose.model<VehicleDocument>("Vehicle", VehicleSchema);
