import React from "react";

type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ className, ...props }, ref) => {
    return <input ref={ref} type="checkbox" className="w-4 h-4" {...props} />;
  }
);

CheckBox.displayName = "CheckBox";

export { CheckBox };
