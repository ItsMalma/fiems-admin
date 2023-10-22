import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "normal" | "filled" | "outlined";
  text?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right" | "center";
  onClick?: () => void;
};

export default function Button({
  className,
  variant = "normal",
  text = "",
  icon,
  iconPosition = "right",
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "flex px-3 py-[9px] 2xl:px-4 2xl:py-3 justify-center items-center gap-3 2xl:gap-4 rounded-[10px] font-semibold",
        variant === "filled" && "bg-primary dark:bg-primary text-white",
        variant === "outlined" &&
          "border-[1.5px] 2xl:border-2 border-primary dark:vorder-primary-active bg-inherit text-primary dark:text-primaryHover",
        className
      )}
      onClick={() => onClick && onClick()}
    >
      {iconPosition === "left" && icon}
      {iconPosition === "center" ? icon : <p>{text}</p>}
      {iconPosition === "right" && icon}
    </button>
  );
}
