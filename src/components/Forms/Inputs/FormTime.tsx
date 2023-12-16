import { InputTime } from "@/components/Elements";
import { ControlPrefix } from "@/components/Forms/prefix.context";
import clsx from "clsx";
import React from "react";
import { useController } from "react-hook-form";

type FormTimeProps = {
  id?: string;
  name: string;
  isDefault?: boolean;
  className?: string;
  readOnly?: boolean;
};

export function FormTime(props: FormTimeProps) {
  const namePrefix = React.useContext(ControlPrefix);

  const { field, fieldState } = useController({
    name: namePrefix + props.name,
    defaultValue: React.useMemo(() => {
      if (props.isDefault) {
        return "00:00";
      }
    }, [props.isDefault]),
  });

  return (
    <InputTime
      id={props.id}
      name={field.name}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      isError={!!fieldState.error}
      readOnly={props.readOnly || props.isDefault}
      className={clsx("basis-2/3", props.className)}
      autoComplete="off"
    />
  );
}
