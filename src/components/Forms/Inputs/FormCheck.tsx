import { CheckBox } from "@/components/Elements";
import { ControlPrefix } from "@/components/Forms/prefix.context";
import React from "react";
import { useController } from "react-hook-form";

type FormCheckProps = {
  name: string;
  readOnly?: boolean;
  className?: string;
};

export function FormCheck(props: FormCheckProps) {
  const namePrefix = React.useContext(ControlPrefix);

  const { field, fieldState } = useController({
    name: namePrefix + props.name,
  });

  return (
    <div className="flex gap-3 items-center basis-2/3">
      <CheckBox
        name={field.name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        checked={field.value}
        readOnly={props.readOnly}
      />
    </div>
  );
}
