import React from "react";
import clsx from "clsx";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";

type SelectProps = React.InputHTMLAttributes<HTMLInputElement> & {
  options: string[];
};

const NewSelect = React.forwardRef<HTMLInputElement, SelectProps>(
  ({ className, options, ...props }, ref) => {
    const innerRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => innerRef.current!);

    const [active, setActive] = React.useState<number>();

    const [expand, setExpand] = React.useState(false);

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

    return (
      <div className={clsx("relative", className)}>
        <div
          className="bg-white border-[1.5px] border-gray-300 rounded-lg text-gray-700 flex items-center overflow-hidden gap-3 2xl:gap-4"
          onClick={() => {
            setExpand(!expand);
            if (!expand) {
              setMenuPosition("bottom");
            }
          }}
        >
          <input
            ref={innerRef}
            type="text"
            {...props}
            className="pl-3 py-1.5 2xl:pl-4 2xl:py-2 overflow-auto grow bg-inherit outline-none border-none"
            value={active !== undefined ? options[active] : ""}
          />
          <span className="ml-auto pr-3 2xl:pr-4">
            {expand ? <CaretUpFill /> : <CaretDownFill />}
          </span>
        </div>
        <div
          ref={menuRef}
          className={clsx(
            "absolute z-50 min-w-full bg-white flex flex-col border-[1.5px] border-gray-300 rounded-lg overflow-hidden",
            expand ? "" : "hidden",
            menuPosition === "bottom" ? "top-full mt-2" : "bottom-full mb-2"
          )}
        >
          {options.map((option, optionIndex) => (
            <div
              key={optionIndex}
              className={clsx(
                "px-3 py-1.5 2xl:px-4 2xl:py-2 text-gray-700 hover:bg-primaryHover hover:text-white cursor-default whitespace-nowrap",
                active === optionIndex &&
                  "bg-primaryActive text-white font-semibold hover:!bg-primaryActive"
              )}
              onClick={() => setActive(optionIndex)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default NewSelect;
