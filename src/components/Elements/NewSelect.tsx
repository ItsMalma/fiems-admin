import clsx from "clsx";
import React from "react";
import { CaretDownFill, CaretUpFill, Search } from "react-bootstrap-icons";
import { Modifier, usePopper } from "react-popper";
import { SelectOption } from ".";

type NewSelectProps = {
  id?: string;
  name?: string;

  options: SelectOption[];
  placeholder?: string;

  className?: string;
  menuClassName?: string;

  isError?: boolean;
  disabled?: boolean;
  readOnly?: boolean;

  onBlur: () => void;
} & (
  | {
      isMulti: false;
      values: string;
      onChange: (newValue: string) => void | Promise<void>;
    }
  | {
      isMulti: true;
      values: string[];
      onChange: (newValue: string[]) => void | Promise<void>;
    }
);

const NewSelect = React.forwardRef<HTMLInputElement, NewSelectProps>(
  (
    {
      options,
      placeholder = "Select",
      isMulti,
      values,
      onChange,
      onBlur,
      isError = false,
      disabled = false,
      readOnly = false,
      ...props
    },
    ref
  ) => {
    const [referenceElement, setReferenceElement] =
      React.useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] =
      React.useState<HTMLDivElement | null>(null);

    const [isOpen, setIsOpen] = React.useState(false);
    React.useEffect(() => {
      if (!isOpen) onBlur();
    }, [isOpen, onBlur]);
    const handleClickOutside = React.useCallback(
      function (e: MouseEvent) {
        if (!referenceElement) return;

        if (popperElement && popperElement.contains(e.target as Node)) return;
        else if (
          referenceElement.contains(e.target as Node) &&
          !disabled &&
          !readOnly
        )
          setIsOpen(!isOpen);
        else setIsOpen(false);
      },
      [disabled, isOpen, popperElement, readOnly, referenceElement]
    );

    React.useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [handleClickOutside, referenceElement]);

    const modifiers = React.useMemo<Modifier<unknown, object>[]>(
      () => [
        { name: "offset", enabled: true, options: { offset: [0, 5] } },
        {
          name: "size",
          enabled: true,
          fn: ({ state }) => {
            state.styles.popper.minWidth = `${state.rects.reference.width}px`;
          },
          phase: "beforeWrite",
          requires: ["computeStyles"],
        },
      ],
      []
    );
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
      strategy: "fixed",
      placement: "bottom-start",
      modifiers,
    });

    const showText = React.useMemo(
      () =>
        isMulti
          ? null
          : options.find((option) => option.value === values)?.label ?? null,
      [isMulti, options, values]
    );

    const [search, setSearch] = React.useState("");

    return (
      <>
        <div
          ref={setReferenceElement}
          className={clsx(
            "bg-white px-3 py-1.5 2xl:px-4 2xl:py-2 border-[1.5px] border-gray-300 rounded-lg text-gray-700 overflow-hidden flex gap-3 items-center",
            (disabled || readOnly) && "!bg-gray-100",
            isError && "border-statusInactive",
            props.className
          )}
        >
          <input
            id={props.id}
            name={props.name}
            type="text"
            className={clsx(
              "overflow-auto grow bg-inherit outline-none border-none cursor-default",
              !showText && "text-gray-300"
            )}
            value={showText ?? placeholder}
            readOnly
            autoComplete="off"
          />
          <span className="flex items-center justify-center">
            {isOpen ? <CaretUpFill /> : <CaretDownFill />}
          </span>
        </div>
        {isOpen && (
          <div
            ref={setPopperElement}
            style={styles.popper}
            className={clsx(
              "z-50 fixed top-0 left-0 w-max max-h-40 overflow-y-auto bg-white flex flex-col border-[1.5px] border-gray-300 rounded-lg",
              props.menuClassName
            )}
            {...attributes.popper}
          >
            <div className="w-full p-1 relative">
              <input
                type="text"
                className="w-full outline-none border-none rounded-lg bg-gray-200 px-2 py-1 text-gray-600"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                autoComplete="off"
              />
              <Search className="absolute top-3 right-3 text-gray-600" />
            </div>
            {options
              .filter(
                (option) =>
                  option.label.toLowerCase().includes(search.toLowerCase()) ||
                  option.value.toLowerCase().includes(search.toLowerCase())
              )
              .map((option) => (
                <div
                  key={option.value}
                  className={clsx(
                    "w-full px-3 py-1.5 2xl:px-4 2xl:py-2 text-gray-700 hover:bg-primaryHover hover:text-white cursor-default whitespace-nowrap",
                    (isMulti
                      ? values.find((value) => value === option.value)
                      : option.value === values) &&
                      "bg-primaryActive text-white font-semibold hover:!bg-primaryActive"
                  )}
                  onClick={() => {
                    if (isMulti) {
                      // cek apakah option sudah dipilih
                      if (values.find((value) => value === option.value)) {
                        onChange(
                          values.filter((value) => value !== option.value)
                        );
                      } else {
                        onChange([...values, option.value]);
                      }
                    } else {
                      // cek apakah option sudah dipilih
                      if (values === option.value) {
                        onChange("");
                      } else {
                        onChange(option.value);
                      }
                    }
                  }}
                >
                  {option.label}
                </div>
              ))}
          </div>
        )}
      </>
    );
  }
);

NewSelect.displayName = "Select";

export { NewSelect };
