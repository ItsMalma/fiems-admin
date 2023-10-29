import { InputText } from "@/components/Elements";
import { ControlPrefix } from "@/components/Forms/prefix.context";
import clsx from "clsx";
import React from "react";
import { useController } from "react-hook-form";

type FormMoneyProps = {
  id?: string;
  name: string;
  className?: string;
  readOnly?: boolean;
};

export function FormMoney(props: FormMoneyProps) {
  const namePrefix = React.useContext(ControlPrefix);

  const { field, fieldState } = useController({
    name: namePrefix + props.name,
  });

  return (
    <InputText
      id={props.id ?? field.name}
      name={field.name}
      value={field.value}
      onChange={(e) => {
        const valueAsNumber = Number(e.target.value);
        if (isNaN(valueAsNumber)) {
          e.preventDefault();
          return;
        }
        field.onChange(valueAsNumber);
      }}
      onBlur={field.onBlur}
      isError={!!fieldState.error}
      readOnly={props.readOnly}
      className={clsx("basis-2/3", props.className)}
      autoComplete="off"
    />
  );
}
