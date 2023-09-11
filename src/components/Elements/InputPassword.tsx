import clsx from "clsx";
import React from "react";

type InputPasswordProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="password"
        className={clsx(
          "px-3 py-1.5 2xl:px-4 2xl:py-2 border-[1.5px] border-gray-300 rounded-lg outline-none text-gray-700",
          props.disabled && "bg-gray-100",
          className
        )}
        {...props}
      />
    );
  }
);

export default InputPassword;
