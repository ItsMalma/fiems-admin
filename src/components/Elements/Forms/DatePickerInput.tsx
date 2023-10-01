import React from "react";
import { useField } from "formik";
import DatePicker from "../DatePicker";
import moment from "moment";

type DatePickerInputProps = Omit<
  React.ComponentProps<typeof DatePicker>,
  "value" | "onChange" | "isError"
> & {
  name: string;
};

export default function DatePickerInput(props: DatePickerInputProps) {
  const [input, meta, { setValue }] = useField({
    id: props.id,
    name: props.name,
  });

  const handleChange = React.useCallback(
    (value: any) => {
      setValue(moment(value).format("DD/MM/YYYY"));
    },
    [setValue]
  );

  return (
    <DatePicker
      {...props}
      id={props.id}
      name={input.name}
      value={meta.value}
      onChange={handleChange}
      isError={!!meta.error}
    />
  );
}
