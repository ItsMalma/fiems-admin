import { Select, SelectOption } from "@/components/Elements";
import { ControlPrefix } from "@/components/Forms/prefix.context";
import clsx from "clsx";
import React from "react";
import { useController } from "react-hook-form";

type FormSelectProps = {
  id?: string;
  name: string;
  readOnly?: boolean;
  className?: string;
  options: SelectOption[] | undefined;
  isCreatable?: boolean;
};

export function FormSelect(props: FormSelectProps) {
  const namePrefix = React.useContext(ControlPrefix);

  const { field, fieldState } = useController({
    name: namePrefix + props.name,
  });
  const { value, onChange } = field;

  React.useEffect(() => {
    if (props.options === undefined) return;

    if (!props.options.find((option) => option.value === value)) {
      onChange("");
    }
  }, [props.options, value, onChange]);

  return (
    <Select
      ref={field.ref}
      id={props.id ?? field.name}
      name={field.name}
      options={props.options ?? []}
      isSearchable
      isCreatable={props.isCreatable}
      value={value}
      onChange={(option) => {
        onChange(option);
      }}
      onBlur={field.onBlur}
      isError={!!fieldState.error}
      readOnly={props.readOnly}
      className={clsx("basis-2/3", props.className)}
      autoComplete="off"
    />
  );
}
