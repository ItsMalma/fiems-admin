import clsx from "clsx";
import React from "react";
import { Loading } from ".";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "normal" | "filled" | "outlined";
  text?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  onClick?: () => void;
};

export function Button({
  className,
  variant = "normal",
  text = "",
  icon,
  iconPosition = "right",
  isLoading = false,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "flex px-3 py-[9px] 2xl:px-4 2xl:py-3 justify-center items-center gap-3 2xl:gap-4 rounded-[10px] font-semibold",
        variant === "filled" && "bg-primary text-white",
        variant === "outlined" &&
          "border-[1.5px] 2xl:border-2 border-primary bg-inherit text-primary",
        className
      )}
      onClick={() => onClick && onClick()}
    >
      {iconPosition === "left" &&
        (isLoading ? <Loading size="xs" color="white" /> : icon)}
      <p>{text}</p>
      {iconPosition === "right" &&
        (isLoading ? <Loading size="xs" color="white" /> : icon)}
    </button>
  );
}
