import React from "react";
import clsx from "clsx";
import { Calendar as CalendarIcon } from "react-bootstrap-icons";
import moment from "moment";

type DatePickerProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState(new Date());

    const inputDateRef = React.useRef<HTMLInputElement>(null);
    const [calendarVisibility, setCalendarVisibility] = React.useState(false);

    React.useEffect(() => {
      if (!inputDateRef.current || props.disabled || props.readOnly) {
        return;
      }

      if (calendarVisibility) {
        inputDateRef.current.showPicker();
      }
    }, [calendarVisibility]);

    return (
      <>
        <div
          className={clsx(
            "px-3 py-1.5 2xl:px-4 2xl:py-2 border-[1.5px] bg-white text-gray-700 border-gray-300 rounded-lg overflow-hidden flex items-center gap-[9px] 2xl:gap-3",
            (props.disabled || props.readOnly) && "!bg-gray-100",
            className
          )}
          onClick={() => setCalendarVisibility(!calendarVisibility)}
        >
          <input
            ref={ref}
            type="text"
            className="cursor-default overflow-auto grow bg-inherit outline-none border-none"
            value={moment(inputValue).format("DD/MM/YYYY")}
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
              setInputValue(e.target.valueAsDate ?? new Date());
              setCalendarVisibility(false);
            }}
          />
        </div>
      </>
    );
  }
);

export default DatePicker;
