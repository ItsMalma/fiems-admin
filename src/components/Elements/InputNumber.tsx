import React from "react";
import clsx from "clsx";

type InputNumberProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  isError?: boolean;
};

const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
  ({ className, isError, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="number"
        className={clsx(
          "bg-white px-3 py-1.5 2xl:px-4 2xl:py-2 border-[1.5px] border-gray-300 rounded-lg outline-none text-gray-700",
          (props.disabled || props.readOnly) && "!bg-gray-100",
          isError && "border-statusInactive",
          className
        )}
        {...props}
      />
    );
  }
);

InputNumber.displayName = "InputNumber";

export default InputNumber;
