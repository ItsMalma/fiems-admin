import clsx from "clsx";
import React from "react";
import { Clock } from "react-bootstrap-icons";

type InputTimeProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "type" | "defaultValue" | "value"
> & {
  onChange: (newValue: string) => void;
  value: string;
  isError?: boolean;
};

const InputTime = React.forwardRef<HTMLInputElement, InputTimeProps>(
  ({ className, onChange, value, isError, ...props }, ref) => {
    const inputTimeRef = React.useRef<HTMLInputElement>(null);
    const [timeVisibility, setTimeVisibility] = React.useState(false);

    React.useEffect(() => {
      if (!inputTimeRef.current || props.disabled || props.readOnly) {
        return;
      }

      if (timeVisibility) {
        inputTimeRef.current.showPicker();
      }
    }, [timeVisibility, props.disabled, props.readOnly]);

    return (
      <>
        <div
          className={clsx(
            "px-3 py-1.5 2xl:px-4 2xl:py-2 border-[1.5px] bg-white text-gray-700 border-gray-300 rounded-lg overflow-hidden flex items-center gap-[9px] 2xl:gap-3",
            isError && "border-statusInactive",
            (props.disabled || props.readOnly) && "!bg-gray-100",
            className
          )}
          onClick={() => setTimeVisibility(!timeVisibility)}
        >
          <input
            ref={ref}
            type="text"
            className="cursor-default overflow-auto grow bg-inherit outline-none border-none"
            value={value}
            onChange={() => {}}
            readOnly
            {...props}
          />
          <span className="ml-auto">
            <Clock />
          </span>
          <input
            ref={inputTimeRef}
            type="time"
            className="invisible absolute"
            onChange={(e) => {
              onChange(e.target.value);
              setTimeVisibility(false);
            }}
          />
        </div>
      </>
    );
  }
);

InputTime.displayName = "InputTime";

export { InputTime };
