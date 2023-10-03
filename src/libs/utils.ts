import lodash from "lodash";

export const CustomerTypes = ["factory", "vendor", "shipping"] as const;

export const JobPositions = ["director", "marketing"] as const;

export const TruckTypes = [
  "engkel single",
  "engkel double",
  "fuso",
  "tronton",
  "trinton",
  "trintin",
  "trailer",
] as const;

export const ContainerSizes = [
  "20 feet",
  "21 feet",
  "40 feet",
  "41 feet",
  "40 hc",
  "combo",
] as const;

export const Cylinders = [2, 4, 8];

export const VesselUnits = ["container", "teus", "ton"] as const;

export function toTitleCase(str: string): string {
  return lodash.startCase(lodash.toLower(str));
}

export type ApiResponsePayload<TData extends any> =
  | {
      data: null;
      error: string | { [field: string]: string };
    }
  | {
      data: TData;
      error: null;
    };
