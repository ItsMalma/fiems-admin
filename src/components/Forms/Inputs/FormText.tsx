import { InputText } from "@/components/Elements";
import { ControlPrefix } from "@/components/Forms/prefix.context";
import clsx from "clsx";
import React from "react";
import { useController } from "react-hook-form";

type FormTextProps = {
  id?: string;
  name: string;
  className?: string;
  readOnly?: boolean;
  numeric?: boolean;
};

export function FormText(props: FormTextProps) {
  const namePrefix = React.useContext(ControlPrefix);

  const { field, fieldState } = useController({
    name: namePrefix + props.name,
  });

  return (
    <InputText
      id={props.id ?? field.name}
      name={field.name}
      value={field.value ?? ""}
      onChange={(e) => {
        if (props.numeric && !isNaN(Number(e.currentTarget.value))) {
          field.onChange(e);
        } else if (!props.numeric) {
          field.onChange(e);
        }
      }}
      onBlur={field.onBlur}
      isError={!!fieldState.error}
      readOnly={props.readOnly}
      className={clsx("basis-2/3", props.className)}
      autoComplete="off"
    />
  );
}
