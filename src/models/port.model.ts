import mongoose from "mongoose";
import { z } from "zod";
import { savePortSchema } from "@/validations/port.validation";

export type SavePortInput = z.infer<typeof savePortSchema>;

export type PortOutput = {
  id: number;
  createDate: string;
  code: string;
  province: string;
  city: string;
  name: string;
};

export type Port = {
  province: string;
  city: string;
  name: string;
  code: string;
  createDate: Date;
};

export type PortDocument = Port & mongoose.Document<number>;

const PortSchema = new mongoose.Schema<PortDocument>(
  {
    _id: {
      type: Number,
      required: true,
    },
    province: {
      type: String,
      required: [true, "Please enter the port province"],
    },
    city: {
      type: String,
      required: [true, "Please enter the port province"],
    },
    name: {
      type: String,
      required: [true, "Please enter the port name"],
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
    collection: "ports",
  }
);

export const PortModel =
  (mongoose.models.Port as mongoose.Model<PortDocument>) ||
  mongoose.model<PortDocument>("Port", PortSchema);
