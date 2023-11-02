import lodash from "lodash";
import { FieldPath } from "react-hook-form";
import { FieldValues } from "../../node_modules/react-hook-form/dist/types/fields";

export function filterValidObject(objs: object[]): object[] {
  return objs.filter((obj) => !lodash.isEmpty(obj));
}

export function setValues<TFieldValues extends FieldValues>(
  values: TFieldValues,
  setValue: (name: FieldPath<TFieldValues>, value: any) => void,
  prefix?: string
) {
  Object.keys(values).forEach((name) => {
    if (typeof values[name] === "object") {
      setValues(values[name], setValue, prefix ? `${prefix}.${name}` : name);
      return;
    }
    setValue(
      (prefix ? `${prefix}.${name}` : name) as FieldPath<TFieldValues>,
      values[name]
    );
  });
}
