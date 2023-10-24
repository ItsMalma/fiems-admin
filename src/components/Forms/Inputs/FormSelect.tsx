import { Select } from "@/components/Elements";
import { SelectOption } from "@/components/Elements/Select";
import clsx from "clsx";
import { useController } from "react-hook-form";

type FormSelectProps = {
  id?: string;
  name: string;
  readOnly?: boolean;
  className?: string;
  options: SelectOption[];
};

export function FormSelect(props: FormSelectProps) {
  const { field, fieldState } = useController({
    name: props.name,
  });

  return (
    <Select
      ref={field.ref}
      id={props.id ?? field.name}
      name={field.name}
      options={props.options}
      isSearchable
      value={field.value}
      onChange={(option) => {
        field.onChange(option?.value);
      }}
      onBlur={field.onBlur}
      isError={!!fieldState.error}
      readOnly={props.readOnly}
      className={clsx("basis-2/3", props.className)}
      autoComplete="off"
    />
  );
}
