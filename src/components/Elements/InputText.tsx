import clsx from "clsx";
import React from "react";

type InputTextProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(({className, ...props}, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      className={clsx(
        "px-3 py-1.5 border-[1.5px] border-gray-300 rounded-lg outline-none text-gray-700",
        props.disabled && "bg-gray-100",
        className
      )}
      {...props}
    />
  );
})

export default InputText;