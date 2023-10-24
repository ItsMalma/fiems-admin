import { InputText } from "@/components/Elements";
import clsx from "clsx";
import { useController } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

type FormEmailProps = {
  id?: string;
  name: string;
  className?: string;
  readOnly?: boolean;
};

export function FormEmail(props: FormEmailProps) {
  const { field, fieldState } = useController({
    name: props.name,
    rules: {
      validate: (value) => {
        if (!isEmail(value)) {
          return "Invalid format";
        }
      },
    },
  });

  return (
    <InputText
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
