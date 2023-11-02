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
      <div
        className={clsx(
          "bg-white px-3 py-1.5 2xl:px-4 2xl:py-2 border-[1.5px] border-gray-300 rounded-lg text-gray-700 overflow-hidden flex items-center",
          (props.disabled || props.readOnly) && "!bg-gray-100",
          isError && "border-statusInactive",
          className
        )}
      >
        <input
          ref={ref}
          type="text"
          className="overflow-auto grow bg-inherit outline-none border-none"
          {...props}
        />
      </div>
    );
  }
);

InputText.displayName = "InputText";

export { InputText };
