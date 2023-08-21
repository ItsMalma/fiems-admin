import React from "react";

type RadioType = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

const Radio = React.forwardRef<HTMLInputElement, RadioType>(({
  ...props
}, ref) => {
  return (
    <div className="flex items-center gap-2">
      <input
        ref={ref}
        type="radio"
        className="w-4 h-4"
        {...props}
      />
      <p className="text-gray-800">{props.value}</p>
    </div>
  );
});

export default Radio;