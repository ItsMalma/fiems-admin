import React, { ChangeEvent } from "react";
import { useField } from "formik";
import InputText from "../InputText";

type InputMoneyProps = React.ComponentProps<typeof InputText> & {
  name: string;
};

export default function InputMoney(props: InputMoneyProps) {
  const [input, meta, { setValue }] = useField({
    id: props.id,
    name: props.name,
  });

  const [isBlank, setIsBlank] = React.useState(false);

  return (
    <InputText
      {...props}
      id={props.id}
      name={input.name}
      value={isBlank ? "" : meta.value}
      onChange={(e) => {
        setIsBlank(e.currentTarget.value === "");

        const valueNumber = Number(e.currentTarget.value);
        if (!isNaN(valueNumber)) {
          setValue(valueNumber);
        }
      }}
      isError={!!meta.error}
    />
  );
}
