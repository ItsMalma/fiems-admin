import clsx from "clsx";
import { useField } from "formik";
import React from "react";
import Radio from "../Radio";

type RadioInputProps = {
  id?: string;
  name: string;
  options: {
    label: string;
    value: string;
  }[];
  className?: string;
};

export default function RadioInput(props: RadioInputProps) {
  const [input, meta, { setValue }] = useField({
    id: props.id,
    name: props.name,
  });

  const handleChange = React.useCallback(
    (option: string) => {
      setValue(option);
    },
    [setValue]
  );

  return (
    <div className={clsx("flex justify-between", props.className)}>
      {props.options.map((option, index) => (
        <Radio
          key={index}
          id={props.id}
          name={props.name}
          value={option.value}
          text={option.label}
          checked={input.value === option.value}
          onChange={() => handleChange(option.value)}
        />
      ))}
    </div>
  );
}
