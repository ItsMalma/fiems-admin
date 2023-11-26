import { Radio, SelectOption } from "@/components/Elements";
import { ControlPrefix } from "@/components/Forms/prefix.context";
import React from "react";
import { useController } from "react-hook-form";

type FormRadioProps = {
  name: string;
  readOnly?: boolean;
  className?: string;
  options: SelectOption[];
};

export function FormRadio(props: FormRadioProps) {
  const namePrefix = React.useContext(ControlPrefix);

  const { field, fieldState } = useController({
    name: namePrefix + props.name,
  });

  return (
    <div className="flex gap-3 items-center basis-2/3">
      {props.options.map((option) => (
        <Radio
          key={option.value}
          name={field.name}
          label={option.label}
          value={option.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          checked={field.value === option.value}
          readOnly={props.readOnly}
        />
      ))}
    </div>
  );
}
