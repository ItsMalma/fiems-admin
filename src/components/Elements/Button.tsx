import { ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = {
  className?: string;
  variant?: "filled" | "outlined";
  text?: string;
  icon?: ReactNode;
  onClick?: () => void;
};

export default function Button({
  variant = "filled",
  text = "Click Me",
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "flex px-3 py-1.5 justify-center items-center gap-3 rounded-lg font-semibold",
        variant === "filled" && "bg-primary text-white",
        variant === "outlined" && "border-[1.5px] border-primary bg-inherit text-primary",
        props.className
      )}
      onClick={() => props.onClick && props.onClick()}
    >
      <p>{text}</p>
      {props.icon}
    </button>
  );
}