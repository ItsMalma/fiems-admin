import clsx from "clsx";

type LabelProps = {
  className?: string;
  name: string;
};

export default function Label(props: LabelProps) {
  return (
    <label
      className={clsx(
        "text-gray-700 font-semibold",
        props.className
      )}
    >
      {props.name}
    </label>
  );
}