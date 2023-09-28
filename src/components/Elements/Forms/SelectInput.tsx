import React from "react";
import { useField } from "formik";
import Select from "../Select";

type SelectInputProps = Omit<
  React.ComponentProps<typeof Select>,
  "value" | "onChange" | "isError"
> & {
  name: string;
};

export default function SelectInput(props: SelectInputProps) {
  const [input, meta, { setValue }] = useField({
    id: props.id,
    name: props.name,
  });

  const handleChange = React.useCallback(
    (option: any) => {
      setValue(option);
    },
    [setValue]
  );

  return (
    <Select
      {...props}
      id={props.id}
      name={input.name}
      value={input.value}
      onChange={handleChange}
      isError={!!meta.error}
    />
  );
}
