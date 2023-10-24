import { InputNumber } from "@/components/Elements";
import clsx from "clsx";
import { useController } from "react-hook-form";

type FormCounterProps = {
  id?: string;
  name: string;
  className?: string;
  readOnly?: boolean;
  min?: number;
  max?: number;
};

export function FormCounter(props: FormCounterProps) {
  const { field, fieldState } = useController({
    name: props.name,
    rules: {
      validate: (value) => {
        if (props.min && value < props.min) {
          return `Less than minimum (${props.min})`;
        } else if (props.max && value > props.max) {
          return `Greater than maximum (${props.max})`;
        }
      },
    },
  });

  return (
    <InputNumber
      id={props.id ?? field.name}
      name={field.name}
      value={field.value}
      onChange={(e) => field.onChange(e.target.valueAsNumber)}
      onBlur={field.onBlur}
      isError={!!fieldState.error}
      readOnly={props.readOnly}
      className={clsx("basis-2/3", props.className)}
      min={props.min}
      max={props.max}
      autoComplete="off"
    />
  );
}
