import ReactSelect, {
  ClearIndicatorProps,
  components,
  ContainerProps,
  ControlProps,
  DropdownIndicatorProps,
  InputProps,
  MenuListProps,
  MenuProps,
  OptionProps,
  SingleValueProps,
  ValueContainerProps,
  CoercedMenuPlacement,
} from "react-select";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

const MenuPlacementContext = React.createContext<{
  value: CoercedMenuPlacement | undefined;
  setValue: (newValue: CoercedMenuPlacement | undefined) => void;
}>({
  value: undefined,
  setValue: () => {},
});

type SelectOption = {
  label: string;
  value: number;
};

type SelectProps = {
  className?: string;
  options: string[];
  value: number;
  multi?: boolean;
  search?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
  onChange: (value?: number | number[]) => void;
};

function SelectContainer({ children, ...props }: ContainerProps<SelectOption>) {
  return (
    <components.SelectContainer {...props}>
      {children}
    </components.SelectContainer>
  );
}

function Control({ children, ...props }: ControlProps<SelectOption>) {
  const { value } = React.useContext(MenuPlacementContext);

  return (
    <components.Control
      {...props}
      className={clsx(
        "h-full !px-3 !py-0.5 !border-[1.5px] !border-gray-300 !rounded-lg !shadow-none",
        props.menuIsOpen &&
          (value === "top"
            ? "!border-t-0 !rounded-t-none"
            : "!border-b-0 !rounded-b-none")
      )}
    >
      {children}
    </components.Control>
  );
}

function ValueContainer({
  children,
  ...props
}: ValueContainerProps<SelectOption>) {
  return (
    <components.ValueContainer
      {...props}
      className="!flex !p-0 gap-x-2 !text-gray-700 !overflow-x-hidden"
    >
      {children}
    </components.ValueContainer>
  );
}

function SingleValue({ children, ...props }: SingleValueProps<SelectOption>) {
  return (
    <components.SingleValue {...props} className="!m-0 !text-gray-700">
      {children}
    </components.SingleValue>
  );
}

function Input({ children, ...props }: InputProps<SelectOption>) {
  return (
    <components.Input {...props} className="!m-0 !p-0">
      {children}
    </components.Input>
  );
}

function DropdownIndicator({
  children,
  ...props
}: DropdownIndicatorProps<SelectOption>) {
  return (
    <components.DropdownIndicator {...props} className="!p-0">
      <FontAwesomeIcon
        icon={["fas", props.selectProps.menuIsOpen ? "caret-up" : "caret-down"]}
        className="text-gray-700"
      />
    </components.DropdownIndicator>
  );
}

function ClearIndicator({
  children,
  ...props
}: ClearIndicatorProps<SelectOption>) {
  return (
    <components.ClearIndicator {...props}>
      <FontAwesomeIcon icon={["fas", "xmark"]} />
    </components.ClearIndicator>
  );
}

function Menu({ children, ...props }: MenuProps<SelectOption>) {
  const { setValue } = React.useContext(MenuPlacementContext);
  setValue(props.placement);

  return (
    <components.Menu
      {...props}
      className={clsx(
        "!m-0 !pb-0 !border-[1.5px] !border-solitude2 !rounded-xl !shadow-none !overflow-hidden",
        props.placement === "top"
          ? "!border-b-0 !rounded-b-none"
          : "!border-t-0 !rounded-t-none"
      )}
    >
      {children}
    </components.Menu>
  );
}

function MenuList({ children, ...props }: MenuListProps<SelectOption>) {
  return (
    <components.MenuList {...props} className="!p-0">
      {children}
    </components.MenuList>
  );
}

function Option({ children, ...props }: OptionProps<SelectOption>) {
  return (
    <components.Option
      {...props}
      className={clsx(
        "!flex items-center gap-x-1 !text-gray-700 !px-3 !py-0.5 hover:!bg-primaryHover",
        props.isSelected &&
          !props.isMulti &&
          "!bg-primaryActive !text-solitudeActive",
        props.isSelected &&
          props.isMulti &&
          "!bg-inherit hover:!bg-primaryHover"
      )}
    >
      <div>{children}</div>
      {props.isSelected && props.isMulti && (
        <FontAwesomeIcon icon={["fas", "check"]} className="ml-auto" />
      )}
    </components.Option>
  );
}

function None() {
  return <></>;
}

export default function Select({
  value = 0,
  multi = false,
  search = false,
  ...props
}: SelectProps) {
  const [menuPlacementValue, setMenuPlacementValue] = React.useState<
    CoercedMenuPlacement | undefined
  >(undefined);

  return (
    <MenuPlacementContext.Provider
      value={{ value: menuPlacementValue, setValue: setMenuPlacementValue }}
    >
      <ReactSelect
        className={props.className}
        instanceId={React.useId()}
        isMulti={multi}
        isSearchable={search}
        hideSelectedOptions={false}
        closeMenuOnSelect={multi ? false : true}
        closeMenuOnScroll={true}
        menuPlacement="auto"
        options={props.options.map((option, index) => ({
          label: option,
          value: index,
        }))}
        defaultValue={
          props.options.length > 0 && !props.placeholder
            ? {
                label: props.options[0],
                value: 0,
              }
            : null
        }
        placeholder={props.placeholder && <p>{props.placeholder}</p>}
        components={{
          SelectContainer,
          Control,
          ValueContainer: ({ children, ...valueContainerProps }) => (
            <ValueContainer {...valueContainerProps}>
              {props.icon}
              {props.placeholder &&
                (!valueContainerProps.hasValue ||
                  valueContainerProps.isMulti) && (
                  <p className="!m-0 !text-gray-700 flex gap-x-2 items-center">
                    {props.placeholder}
                  </p>
                )}
              {children}
            </ValueContainer>
          ),
          Placeholder: None,
          SingleValue,
          MultiValue: None,
          Input,
          IndicatorSeparator: None,
          DropdownIndicator,
          ClearIndicator,
          Menu,
          MenuList,
          Option,
        }}
      />
    </MenuPlacementContext.Provider>
  );
}
