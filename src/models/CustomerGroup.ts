import mongoose from "mongoose";

export interface CustomerGroups extends mongoose.Document {
  name: string;
  description?: string;
  code: string;
  createDate: Date;
}

const CustomerGroupSchema = new mongoose.Schema<CustomerGroups>(
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
  .CustomerGroup as mongoose.Model<CustomerGroups>) ||
  mongoose.model<CustomerGroups>("CustomerGroup", CustomerGroupSchema);
