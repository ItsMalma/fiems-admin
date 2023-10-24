import clsx from "clsx";
import moment from "moment";
import React from "react";
import { Calendar as CalendarIcon } from "react-bootstrap-icons";

type DatePickerProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "type" | "defaultValue" | "value"
> & {
  onChange: (newValue: Date | string) => void;
  value: Date | string;
  defaultValue?: Date | string;
  isError?: boolean;
};

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, onChange, value, defaultValue, isError, ...props }, ref) => {
    const inputDateRef = React.useRef<HTMLInputElement>(null);
    const [calendarVisibility, setCalendarVisibility] = React.useState(false);

    React.useEffect(() => {
      if (!inputDateRef.current || props.disabled || props.readOnly) {
        return;
      }

      if (calendarVisibility) {
        inputDateRef.current.showPicker();
      }
    }, [calendarVisibility, props.disabled, props.readOnly]);

    return (
      <>
        <div
          className={clsx(
            "px-3 py-1.5 2xl:px-4 2xl:py-2 border-[1.5px] bg-white text-gray-700 border-gray-300 rounded-lg overflow-hidden flex items-center gap-[9px] 2xl:gap-3",
            isError && "border-statusInactive",
            (props.disabled || props.readOnly) && "!bg-gray-100",
            className
          )}
          onClick={() => setCalendarVisibility(!calendarVisibility)}
        >
          <input
            ref={ref}
            type="text"
            className="cursor-default overflow-auto grow bg-inherit outline-none border-none"
            value={moment(value).format("DD/MM/YYYY")}
            readOnly
            {...props}
          />
          <span className="ml-auto">
            <CalendarIcon />
          </span>
          <input
            ref={inputDateRef}
            type="date"
            className="invisible absolute"
            onChange={(e) => {
              onChange(e.target.valueAsDate ?? new Date());
              setCalendarVisibility(false);
            }}
          />
        </div>
      </>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker };
