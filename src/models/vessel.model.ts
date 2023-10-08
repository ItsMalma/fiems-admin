import { z } from "zod";
import { saveVesselSchema } from "@/validations/vessel.validation";
import { CustomerDocument } from "./customer.model";
import { VesselUnits } from "@/libs/utils";
import mongoose from "mongoose";

export type SaveVesselInput = z.infer<typeof saveVesselSchema>;

export type VesselOutput = Omit<Vessel, "shipping" | "createDate"> & {
  id: number;
  shipping: {
    code: string;
    name: string;
  };
  createDate: string;
};

export type Vessel = {
  shipping: mongoose.PopulatedDoc<CustomerDocument & number, number>;
  name: string;
  capacity: number;
  unit: (typeof VesselUnits)[number];
  createDate: Date;
  status: boolean;
};

export type VesselDocument = Vessel & mongoose.Document<number>;

const VesselSchema = new mongoose.Schema<VesselDocument>(
  {
    _id: {
      type: Number,
      required: true,
    },
    shipping: {
      type: Number,
      ref: "Customer",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum: VesselUnits,
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
    collection: "vessels",
  }
);

export const VesselModel =
  (mongoose.models.Vessel as mongoose.Model<VesselDocument>) ||
  mongoose.model<VesselDocument>("Vessel", VesselSchema);
