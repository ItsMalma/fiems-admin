import lodash from "lodash";

export const CustomerTypes = ["factory", "vendor", "shipping"] as const;

export const JobPositions = ["director", "marketing"] as const;

export const TruckTypes = [
  "20 feet single",
  "20 feet combo",
  "40 feet",
  "40 hc",
  "21 feet single",
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
