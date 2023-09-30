import lodash from "lodash";

export const CustomerType = ["factory", "vendor", "shipping"] as const;

export const JobPositions = ["director", "marketing"] as const;

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
