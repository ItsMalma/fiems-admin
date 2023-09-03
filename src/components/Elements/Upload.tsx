import React from "react";
import clsx from "clsx";
import { Upload as UploadIcon } from "react-bootstrap-icons";

type UploadProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

const Upload = React.forwardRef<HTMLInputElement, UploadProps>(
  ({ placeholder, className, ...props }, ref) => {
    const inputFileRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(
      ref,
      () => inputFileRef.current as HTMLInputElement
    );

    const [inputTextValue, setInputTextValue] = React.useState<
      string | undefined
    >();

    const inputFileClicked = () => {
      if (inputFileRef.current) {
        inputFileRef.current.click();
      }
    };

    return (
      <div
        className={clsx(
          "px-3 py-1.5 border-[1.5px] border-gray-300 rounded-lg text-gray-700 flex items-center gap-2",
          className
        )}
        onClick={inputFileClicked}
      >
        <input
          placeholder={placeholder}
          className="outline-none cursor-default"
          readOnly={true}
          value={inputTextValue}
        />
        <input
          ref={inputFileRef}
          type="file"
          className="hidden"
          onChange={(e) => {
            if (props.onChange) props.onChange(e);
            setInputTextValue(e.currentTarget.value);
          }}
          {...props}
        />
        <UploadIcon />
      </div>
    );
  }
);

export default Upload;
