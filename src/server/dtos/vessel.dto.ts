import { SelectOption } from "@/components/Elements";
import { Prisma } from "@prisma/client";
import moment from "moment";
import { z } from "zod";
import { validateCode, validateCounter, validateText } from "../validation";
import { extractCustomerCode } from "./customer.dto";

export const vesselInput = z.object({
  shipping: validateCode((value) => !isNaN(extractCustomerCode(value))),
  name: validateText(),
  capacity: validateCounter(),
  unit: validateText(),
});
export type VesselInput = z.infer<typeof vesselInput>;

export class VesselTableRow {
  constructor(
    public createDate: string,
    public shipping: string,
    public name: string,
    public capacity: number,
    public unit: string,
    public status: boolean,
    public id: string
  ) {}

  static fromModel(
    model: Prisma.VesselGetPayload<{
      include: { shipping: true };
    }>
  ): VesselTableRow {
    return new VesselTableRow(
      moment(model.createDate).toString(),
      `${model.shippingCode} (${model.shipping.name})`,
      model.name,
      model.capacity,
      model.unit,
      model.status,
      model.id
    );
  }
}

export class VesselForm {
  constructor(
    public createDate: string | Date,
    public name: string,
    public shipping: string,
    public capacity: number,
    public unit: string
  ) {}

  static fromModel(
    model: Prisma.VesselGetPayload<{
      include: { shipping: true };
    }>
  ): VesselForm {
    return new VesselForm(
      model.createDate,
      model.name,
      model.shipping.code,
      model.capacity,
      model.unit
    );
  }

  static readonly initial: VesselForm = new VesselForm(
    new Date(),
    "",
    "",
    0,
    ""
  );

  static readonly unitOptions: SelectOption[] = [
    { label: "Teus", value: "Teus" },
    { label: "Container", value: "Container" },
  ];
}
