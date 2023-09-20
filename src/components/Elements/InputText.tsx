import clsx from "clsx";
import React from "react";
import { Tooltip } from "react-tooltip";

type InputTextProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  error?: string;
};

const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
  ({ className, error, ...props }, ref) => {
    const tooltipId = React.useId();

    return (
      <>
        <input
          data-tooltip-id={tooltipId}
          ref={ref}
          type="text"
          className={clsx(
            "bg-white px-3 py-1.5 2xl:px-4 2xl:py-2 border-[1.5px] border-gray-300 rounded-lg outline-none text-gray-700",
            (props.disabled || props.readOnly) && "!bg-gray-100",
            error && "border-statusInactive",
            className
          )}
          {...props}
        />
        {error && (
          <Tooltip id={tooltipId} content={error} place="top" isOpen={true} />
        )}
      </>
    );
  }
);

export default InputText;
