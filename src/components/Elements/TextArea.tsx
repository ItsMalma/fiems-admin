import clsx from "clsx";
import React from "react";

type InputProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = React.forwardRef<HTMLTextAreaElement, InputProps>(({className, ...props}, ref) => {
  return (
    <textarea
      ref={ref}
      className={clsx(
        "px-3 py-1.5 border-[1.5px] border-gray-300 rounded-lg outline-none text-gray-700 resize-none",
        props.disabled && "bg-gray-100",
        className
      )}
      {...props}
    />
  );
})

export default TextArea;