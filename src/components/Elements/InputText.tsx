import clsx from "clsx";
import React from "react";

type InputTextProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  isError?: boolean;
};

const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
  ({ className, isError, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
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

InputText.displayName = "InputText";

export default InputText;
