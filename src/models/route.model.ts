import mongoose from "mongoose";
import { z } from "zod";
import { saveRouteSchema } from "@/validations/route.validation";

export type SaveRouteInput = z.infer<typeof saveRouteSchema>;

export type RouteOutput = {
  id: number;
  createDate: string;
  code: string;
  province: string;
  city: string;
  originDescription: string;
  destinationDescription: string;
};

export type Route = {
  province: string;
  city: string;
  originDescription: string;
  destinationDescription: string;
  code: string;
  createDate: Date;
};

export type RouteDocument = Route & mongoose.Document<number>;

const RouteSchema = new mongoose.Schema<RouteDocument>(
  {
    _id: {
      type: Number,
      required: true,
    },
    province: {
      type: String,
      required: [true, "Please enter the route province"],
    },
    city: {
      type: String,
      required: [true, "Please enter the route province"],
    },
    originDescription: {
      type: String,
      required: [true, "Please enter the route origin description"],
    },
    destinationDescription: {
      type: String,
      required: [true, "Please enter the route destination description"],
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
    collection: "routes",
  }
);

export const RouteModel =
  (mongoose.models.Route as mongoose.Model<RouteDocument>) ||
  mongoose.model<RouteDocument>("Route", RouteSchema);
