import { InputText } from "@/components/Elements";
import clsx from "clsx";
import React from "react";
import { useController } from "react-hook-form";
import { ControlPrefix } from "../prefix.context";

type FormCodeProps = {
  id?: string;
  name: string;
  readOnly?: boolean;
  className?: string;
};

export function FormCode(props: FormCodeProps) {
  const namePrefix = React.useContext(ControlPrefix);

  const { field, fieldState } = useController({
    name: namePrefix + props.name,
  });

  return (
    <InputText
      ref={field.ref}
      id={props.id ?? field.name}
      name={field.name}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      isError={!!fieldState.error}
      readOnly={props.readOnly}
      className={clsx("basis-2/3", props.className)}
      autoComplete="off"
    />
  );
}
