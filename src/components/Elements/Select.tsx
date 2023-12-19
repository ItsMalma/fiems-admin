"use client";

import clsx from "clsx";
import React from "react";
import { CaretDownFill, CaretUpFill, Icon } from "react-bootstrap-icons";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value" | "defaultValue"
> & {
  options: SelectOption[];

  isSearchable?: boolean;

  /**
   * value untuk option yang di-create adalah `"custom"`
   */
  isCreatable?: boolean;

  isMulti?: boolean;

  icon?: Icon;

  isError?: boolean;
} & (
    | {
        isMulti: true;

        value: string[];

        onChange: (options: string[]) => void;
      }
    | {
        isMulti?: false;

        value: string;

        onChange: (option: string) => void;
      }
  );

const Select = React.forwardRef<HTMLInputElement, SelectProps>(
  (
    {
      className,
      options,
      value,
      onChange,
      isSearchable,
      isCreatable,
      isMulti,
      isError,
      ...props
    },
    ref
  ) => {
    // Ref untuk input text
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Untuk mengkombinasikan antar ref dari input text dan ref yang dari forward
    React.useImperativeHandle(ref, () => inputRef.current!);

    // State untuk menyimpan apakah select terbuka atau tidak
    const [expand, setExpand] = React.useState(false);

    // State untuk menyimpan option yang ditampilkan
    const [optionsDisplayed, setOptionsDisplayed] =
      React.useState<SelectOption[]>(options);

    // Memo untuk menyimpan kumpulan option yang dipilih
    const actives = React.useMemo(() => {
      return options.filter((option) => {
        if (isMulti) {
          return value.findIndex((v) => v === option.value) !== -1;
        }
        return option.value === value;
      });
    }, [isMulti, options, value]);

    // Memo untuk menyimpan nilai dari input text
    const [inputValue, setInputValue] = React.useState<string>("");
    React.useEffect(() => {
      if (isMulti || actives.length === 0) {
        setInputValue("");
      } else if (actives.length >= 1) {
        setInputValue(actives[0].label);
      }
    }, [actives, isMulti]);

    const menuRef = React.useRef<HTMLDivElement>(null);
    const [menuPosition, setMenuPosition] = React.useState<"top" | "bottom">(
      "bottom"
    );
    React.useEffect(() => {
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

          if (!isMulti && actives[0]) {
            setInputValue(actives[0].label);
          } else {
            setInputValue("");
          }
          setOptionsDisplayed(options);
        }
      };

      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [actives, containerRef, isMulti, options]);

    React.useEffect(() => {
      setOptionsDisplayed(options);
    }, [options]);

    // Callback untuk click option
    const handleClick = React.useCallback(
      (option: SelectOption) => {
        if (isMulti) {
          setInputValue("");
        }

        if (actives.find((active) => active.value === option.value)) {
          // remove option from actives
          if (isMulti) {
            onChange(
              actives
                .filter((active) => active.value !== option.value)
                .map((active) => active.value)
            );
          } else {
            onChange("");
          }
        } else {
          // add option to actives
          if (isMulti) {
            onChange([...actives.map((active) => active.value), option.value]);
          } else {
            onChange(option.value);
          }
        }
        setExpand(false);
        setOptionsDisplayed(options);
      },
      [actives, isMulti, onChange, options]
    );

    return (
      <div
        ref={containerRef}
        className={clsx("w-full relative", className)}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={clsx(
            "bg-white dark:bg-gray-600 border-[1.5px] border-gray-300 rounded-lg text-gray-700 dark:text-gray-300 flex items-center overflow-hidden gap-[9px] 2xl:gap-3",
            (props.disabled || props.readOnly) &&
              "!bg-gray-100 dark:bg-gray-700",
            isError && "border-statusInactive"
          )}
          onClick={() => {
            if (props.disabled || props.readOnly) {
              return;
            }
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
            onKeyDown={(e) => {
              if (e.key === "Enter" && optionsDisplayed.length === 1) {
                handleClick(optionsDisplayed[0]);
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
            readOnly={(!isSearchable && !isCreatable) || props.readOnly}
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
              "absolute z-50 min-w-full max-h-36 bg-white dark:bg-gray-600 flex flex-col border-[1.5px] border-gray-300 rounded-lg overflow-auto",
              menuPosition === "bottom" ? "top-full mt-2" : "bottom-full mb-2"
            )}
          >
            {optionsDisplayed.map((option) => (
              <div
                key={option.value}
                className={clsx(
                  "px-3 py-1.5 2xl:px-4 2xl:py-2 text-gray-700 dark:text-gray-300 hover:bg-primaryHover hover:text-white dark:hover:text-gray-600 cursor-default whitespace-nowrap",
                  actives.find((active) => active.value === option.value) &&
                    "bg-primaryActive text-white font-semibold hover:!bg-primaryActive"
                )}
                onClick={() => {
                  handleClick(option);
                }}
              >
                {option.label}
              </div>
            ))}
            {actives
              .filter((active) => active.value === "custom")
              .map((active) => (
                <div
                  key={active.value}
                  className="px-3 py-1.5 2xl:px-4 2xl:py-2 bg-primaryActive text-white font-semibold hover:!bg-primaryActive cursor-default whitespace-nowrap"
                >
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
                  handleClick(creatableOption);
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

Select.displayName = "Select";

export { Select };
export type { SelectOption };

