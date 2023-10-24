import { InputText } from "@/components/Elements";
import clsx from "clsx";
import { useController } from "react-hook-form";

type FormCodeProps = {
  id?: string;
  name: string;
  readOnly?: boolean;
  className?: string;
};

export function FormCode(props: FormCodeProps) {
  const { field, fieldState } = useController({
    name: props.name,
  });

  return (
    <InputText
      ref={field.ref}
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
