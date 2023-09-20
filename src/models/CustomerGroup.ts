import mongoose from "mongoose";

export type CustomerGroup = {
  name: string;
  description?: string;
  code: string;
  createDate: Date;
};

export type CustomerGroupDocument = CustomerGroup & mongoose.Document;

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
      default: () => new Date(),
    },
  },
  {
    collection: "customerGroups",
  }
);

export default (mongoose.models
  .CustomerGroup as mongoose.Model<CustomerGroupDocument>) ||
  mongoose.model<CustomerGroupDocument>("CustomerGroup", CustomerGroupSchema);
