import React from "react";

type RadioType = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
};

const Radio = React.forwardRef<HTMLInputElement, RadioType>(
  ({ readOnly, ...props }, ref) => {
    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="radio"
          className="w-4 h-4"
          disabled={readOnly}
          {...props}
        />
        <p className="text-gray-800">{props.label || props.value}</p>
      </div>
    );
  }
);

Radio.displayName = "Radio";

export { Radio };
