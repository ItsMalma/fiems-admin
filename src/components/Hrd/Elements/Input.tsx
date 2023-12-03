import React from "react";
import { Search } from "react-bootstrap-icons";
import { twMerge } from "tailwind-merge";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  label?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  inputType?: "default" | "search";
  className?: {
    container?: string;
    input?: string;
  };
}

const Input = ({
  startIcon,
  endIcon,
  inputType = "default",
  className,
  ...props
}: InputProps) => {
  return (
    <div className={twMerge("w-full", className?.container)}>
      <div className="relative max-w-[400px]">
        <div className="absolute top-1/2 left-[16px] -translate-y-1/2 text-gray-400">
          {inputType === "search" ? (
            <Search className="w-[16px] h-[16px]" />
          ) : (
            endIcon
          )}
        </div>

        <input
          {...props}
          className={twMerge(
            "bg-gray-100 placeholder:text-gray-400 text-gray-900 focus-within:outline-primary py-3 px-4 w-full max-w-[400px] rounded-[10px]",
            endIcon !== undefined && "pr-[3.5rem]",
            (startIcon !== undefined || inputType === "search") &&
              "pl-[3.5rem]",
            className?.input
          )}
        />

        <div className="absolute top-1/2 right-[16px] -translate-y-1/2 text-gray-400">
          {endIcon}
        </div>
      </div>
    </div>
  );
};

export default Input;
