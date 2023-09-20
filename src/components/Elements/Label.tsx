import clsx from "clsx";

type LabelProps = {
  className?: string;
  name: string | string[] | (string | string[])[][];
  optional?: string | string[] | (string | string[])[][];
};

export default function Label(props: LabelProps) {
  return (
    <label
      className={clsx(
        "text-gray-700 font-semibold flex",
        props.className
      )}
    >
      {props.name}
      {props.optional &&
        <i className="font-normal ml-1">
          ({props.optional})
        </i>
      }
    </label>
  );
}