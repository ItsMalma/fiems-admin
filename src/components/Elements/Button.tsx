import { ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = {
  className?: string;
  type?: string;
  variant?: "normal" | "filled" | "outlined";
  text?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right" | "center";
  onClick?: () => void;
};

export default function Button({
  variant = "normal",
  text = "",
  iconPosition = "right",
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "flex px-3 py-[9px] 2xl:px-4 2xl:py-3 justify-center items-center gap-3 2xl:gap-4 rounded-[10px] font-semibold",
        variant === "filled" && "bg-primary text-white",
        variant === "outlined" &&
          "border-[1.5px] 2xl:border-2 border-primary bg-inherit text-primary",
        props.className
      )}
      onClick={() => props.onClick && props.onClick()}
    >
      {iconPosition === "left" && props.icon}
      {iconPosition === "center" ? props.icon : <p>{text}</p>}
      {iconPosition === "right" && props.icon}
    </button>
  );
}
