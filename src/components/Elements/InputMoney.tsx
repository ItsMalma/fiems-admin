import clsx from "clsx";
import React from "react";

type InputMoneyProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  isError?: boolean;
};

const InputMoney = React.forwardRef<HTMLInputElement, InputMoneyProps>(
  ({ className, isError, ...props }, ref) => {
    const [isBlur, setIsBlur] = React.useState(true);

    const displayValue = React.useMemo(() => {
      return Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(Number(props.value));
    }, [props.value]);

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
          onBlur={(e) => {
            setIsBlur(true);
            if (props.onBlur) {
              props.onBlur(e);
            }
          }}
          onFocus={(e) => {
            setIsBlur(false);
            if (props.onFocus) {
              props.onFocus(e);
            }
          }}
          onChange={(e) => {
            if (isBlur) {
              return;
            }
            if (props.onChange) props.onChange(e);
          }}
          value={isBlur || props.readOnly ? displayValue : props.value}
        />
      </div>
    );
  }
);

InputMoney.displayName = "InputMoney";

export { InputMoney };
