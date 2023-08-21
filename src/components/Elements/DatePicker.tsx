import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import moment from "moment";
import ReactDatePicker from "react-datepicker";
import id from "date-fns/locale/id"
import "react-datepicker/dist/react-datepicker.css";

type DatePickerProps = {
  className?: string;
  placeholder?: string;
};

type DatePickerInputProps = DatePickerProps & {
  value: Date;
  setValue: (newValue: Date) => void;
  onClick?: () => void;
}

const DatePickerInput = React.forwardRef<HTMLInputElement, DatePickerInputProps>(({
  placeholder = "Choose date",
  ...props
}, ref) => {
  return (
    <div
      className={clsx(
        "px-3 py-1.5 border-[1.5px] border-gray-300 rounded-lg text-gray-700 flex items-center gap-2",
        props.className
      )}
      onClick={props.onClick}
    >
      <input
        ref={ref}
        placeholder={placeholder}
        className="outline-none"
        readOnly={true}
        value={moment(props.value).format("DD/MM/YYYY")}
      />
      <FontAwesomeIcon icon={["far", "calendar"]} />
    </div>
  );
});

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>((props, ref) => {
  const [value, setValue] = React.useState(new Date());

  return (
    <ReactDatePicker
      locale={id}
      selected={value}
      onChange={newValue => setValue(newValue ?? new Date())}
      customInput={<DatePickerInput ref={ref} {...props} value={value} setValue={setValue} />}
    />
  );
});

export default DatePicker;