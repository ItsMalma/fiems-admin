import { NewSelect, SelectOption } from "@/components/Elements";
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
  disableAutoEmpty?: boolean;
};

export function FormSelect(props: FormSelectProps) {
  const namePrefix = React.useContext(ControlPrefix);

  const { field, fieldState } = useController({
    name: namePrefix + props.name,
  });
  const { value, onChange } = field;

  React.useEffect(() => {
    if (props.options === undefined || value === "") return;

    if (
      !props.options.find((option) => option.value === value) &&
      !props.disableAutoEmpty
    ) {
      onChange("");
    }
  }, [onChange, props.disableAutoEmpty, value, props.options]);

  return (
    <NewSelect
      ref={field.ref}
      id={props.id ?? field.name}
      name={field.name}
      options={props.options ?? []}
      isMulti={false}
      values={value}
      onChange={(newValue) => {
        onChange(newValue);
      }}
      onBlur={field.onBlur}
      isError={!!fieldState.error}
      readOnly={props.readOnly}
      className={clsx("basis-2/3", props.className)}
    />
  );
}
