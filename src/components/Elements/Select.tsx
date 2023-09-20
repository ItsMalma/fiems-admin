import React from "react";
import clsx from "clsx";
import { CaretDownFill, CaretUpFill, Icon } from "react-bootstrap-icons";

type SelectOption = {
  label: string;
  value: any;
};

type SelectProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "defaultValue"
> & {
  options: SelectOption[];

  isSearchable?: boolean;

  /**
   * value untuk option yang di-create adalah `"custom"`
   */
  isCreatable?: boolean;

  isMulti?: boolean;

  icon?: Icon;
} & (
    | {
        isMulti: true;

        defaultValue?: SelectOption[];

        onChange: (options: any[]) => void;
      }
    | {
        isMulti?: false;

        defaultValue?: SelectOption;

        onChange: (option: any) => void;
      }
  );

const Select = React.forwardRef<HTMLInputElement, SelectProps>(
  (
    {
      className,
      options,
      defaultValue,
      onChange,
      isSearchable,
      isCreatable,
      isMulti,
      ...props
    },
    ref
  ) => {
    // Ref untuk input text
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Untuk mengkombinasikan antar ref dari input text dan ref yang dari forward
    React.useImperativeHandle(ref, () => inputRef.current!);

    // State untuk menyimpan nilai dari input text
    const [inputValue, setInputValue] = React.useState<string>("");

    const [expand, setExpand] = React.useState(false);

    const [actives, setActives] = React.useState<SelectOption[]>(
      isMulti ? defaultValue ?? [] : defaultValue ? [defaultValue] : []
    );
    React.useEffect(() => {
      if (isMulti) {
        setInputValue("");
        setOptionsDisplayed(options);
      }

      if (!actives || (!isMulti && actives.length < 1)) {
        return;
      }

      if (isMulti) {
        onChange(actives.map((active) => active.value));
      } else {
        onChange(actives[0].value);
        setInputValue(actives[0].label);
      }
    }, [actives]);

    const menuRef = React.useRef<HTMLDivElement>(null);
    const [menuPosition, setMenuPosition] = React.useState<"top" | "bottom">(
      "bottom"
    );
    React.useLayoutEffect(() => {
      if (!menuRef.current || !expand) {
        return;
      }

      const menuRect = menuRef.current.getBoundingClientRect();
      const bodyRect = document.body.getBoundingClientRect();

      if (menuRect.y + menuRect.height >= bodyRect.height) {
        setMenuPosition("top");
      } else {
        setMenuPosition("bottom");
      }
    }, [expand]);

    const containerRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      const handleMouseUp = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setExpand(false);
        }
      };

      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [containerRef]);

    const [optionsDisplayed, setOptionsDisplayed] =
      React.useState<SelectOption[]>(options);
    React.useEffect(() => {
      setOptionsDisplayed(options);
    }, [options]);

    return (
      <div
        ref={containerRef}
        className={clsx("relative", className)}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="bg-white border-[1.5px] border-gray-300 rounded-lg text-gray-700 flex items-center overflow-hidden gap-[9px] 2xl:gap-3"
          onClick={() => {
            setExpand(!expand);
            if (!expand) {
              setMenuPosition("bottom");
            }
          }}
        >
          {props.icon && (
            <span className="pl-[9px] 2xl:pl-3">
              <props.icon />
            </span>
          )}
          <input
            {...props}
            ref={inputRef}
            type="text"
            className={clsx(
              "py-1.5 2xl:py-2 overflow-auto grow bg-inherit outline-none border-none",
              props.icon ? "" : "px-3 2xl:px-4"
            )}
            value={inputValue}
            onClick={(e) => {
              if (expand) {
                e.stopPropagation();
              }
            }}
            onChange={(e) => {
              setInputValue(e.target.value);
              setOptionsDisplayed(
                options.filter((option) =>
                  option.label
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                )
              );
            }}
            readOnly={!isSearchable && !isCreatable}
            placeholder={props.placeholder}
          />
          <span className="absolute right-3 2xl:right-4">
            {expand ? <CaretUpFill /> : <CaretDownFill />}
          </span>
        </div>
        {expand && (optionsDisplayed.length > 0 || isCreatable) && (
          <div
            ref={menuRef}
            className={clsx(
              "absolute z-50 min-w-full max-h-36 bg-white flex flex-col border-[1.5px] border-gray-300 rounded-lg overflow-auto",
              menuPosition === "bottom" ? "top-full mt-2" : "bottom-full mb-2"
            )}
          >
            {optionsDisplayed.map((option) => (
              <div
                key={option.value}
                className={clsx(
                  "px-3 py-1.5 2xl:px-4 2xl:py-2 text-gray-700 hover:bg-primaryHover hover:text-white cursor-default whitespace-nowrap",
                  actives.find((active) => active.value === option.value) &&
                    "bg-primaryActive text-white font-semibold hover:!bg-primaryActive"
                )}
                onClick={() => {
                  if (
                    actives.find((active) => active.value === option.value) &&
                    isMulti
                  ) {
                    // remove option from actives
                    setActives(
                      actives.filter((active) => active.value !== option.value)
                    );
                  } else {
                    // add option to actives
                    setActives(isMulti ? [...actives, option] : [option]);
                  }
                }}
              >
                {option.label}
              </div>
            ))}
            {actives
              .filter((active) => active.value === "custom")
              .map((active) => (
                <div className="px-3 py-1.5 2xl:px-4 2xl:py-2 bg-primaryActive text-white font-semibold hover:!bg-primaryActive cursor-default whitespace-nowrap">
                  {active.label}
                </div>
              ))}
            {optionsDisplayed.length === 0 && isCreatable && (
              <div
                className="px-3 py-1.5 2xl:px-4 2xl:py-2 text-gray-700 hover:bg-primaryHover hover:text-white cursor-default whitespace-nowrap"
                onClick={() => {
                  const creatableOption: SelectOption = {
                    label: inputValue,
                    value: "custom",
                  };
                  setOptionsDisplayed(options);
                  setActives([...actives, creatableOption]);
                }}
              >
                Create
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

export default Select;
