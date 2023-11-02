import clsx from "clsx";
import lodash from "lodash";
import React from "react";
import { PlusCircle, X } from "react-bootstrap-icons";
import {
  FieldErrors,
  FormProvider,
  UseFormReturn,
  useFieldArray,
} from "react-hook-form";
import { Button, Label } from "../Elements";
import { ControlPrefix } from "./prefix.context";

type FormControl = {
  isHidden?: boolean;
} & (
  | {
      type: "input";
      id: string;
      label: string;
      input: React.ReactNode;
    }
  | { type: "separator" }
  | { type: "blank" }
);

type FormTab = {
  id: string;
  name: string;
  isHide?: boolean;
} & (
  | {
      isAppend?: false;
      controls: FormControl[];
    }
  | {
      isAppend: true;
      itemName: string;
      fieldName: string;
      controls: FormControl[];
      defaultValue?: any;
    }
);

type FormTabMenuProps = {
  tabActive: number;
  setTabActive: (newTabIndex: number) => void;
  tabs: FormTab[];
};

function FormTabMenu(props: FormTabMenuProps) {
  return (
    <div className="flex gap-1.5 2xl:gap-2 sticky top-0 bg-white z-30">
      {props.tabs
        .filter((tab) => !tab.isHide)
        .map((tab, tabIndex) => (
          <Button
            key={tab.id}
            type="button"
            variant="normal"
            text={tab.name}
            className={clsx(
              "font-normal !text-gray-500 !rounded-none",
              props.tabActive === tabIndex &&
                "border-b-[3px] border-b-primaryActive !font-semibold !text-gray-800"
            )}
            onClick={() => props.setTabActive(tabIndex)}
          />
        ))}
    </div>
  );
}

type FormControlsProps = {
  active: boolean;
  controls: FormControl[];
  errors: FieldErrors<any>;
};

function FormControls(props: FormControlsProps) {
  return (
    <div
      className={clsx(
        "grow grid grid-cols-1 lg:grid-cols-2 gap-x-[18px] 2xl:gap-x-6 gap-y-3 2xl:gap-y-4 overflow-auto",
        !props.active && "hidden"
      )}
    >
      {props.controls
        .filter((control) => !control.isHidden)
        .map((control, controlIndex) => {
          switch (control.type) {
            case "input":
              return (
                <div key={control.id} className="flex flex-col gap-1">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center">
                    <Label name={control.label} className="basis-1/3" />
                    {control.input}
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center">
                    <span className="basis-1/3"></span>
                    <p className="basis-2/3 text-statusInactive">
                      {lodash
                        .get(props.errors, control.id)
                        ?.message?.toString()}
                    </p>
                  </div>
                </div>
              );
            case "blank":
              return <div key={controlIndex}></div>;
            case "separator":
              return <hr key={controlIndex} className="col-span-full" />;
          }
        })}
    </div>
  );
}

type FormAppendProps = {
  active: boolean;
  name: string;
  fieldName: string;
  controls: FormControl[];
  errors: FieldErrors<any>;
  defaultValue: any;
};

function FormAppend(props: FormAppendProps) {
  const { fields, append, remove } = useFieldArray({ name: props.fieldName });

  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    if (fields.length === 0) return;
    if (active < 0) setActive(0);
    else if (active >= fields.length) setActive(fields.length - 1);
  }, [active, fields.length]);

  return (
    <div
      className={clsx(
        "flex gap-[18px] 2xl:gap-6 relative overflow-auto",
        !props.active && "hidden"
      )}
    >
      <>
        <div className="sticky left-0 basis-1/5 flex flex-col gap-3 2xl:gap-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className={clsx(
                "flex items-center px-3 py-2 2xl:px-4 gap-3 2xl:gap-4 rounded-[10px] font-semibold border-[1.5px]",
                index === active && "text-black border-black",
                index !== active &&
                  "text-gray-200 border-gray-200 cursor-pointer"
              )}
              onClick={() => setActive(index)}
            >
              <p>{`${props.name} ${index + 1}`}</p>
              {index === active && fields.length > 1 && (
                <span
                  className="ml-auto cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(index);
                  }}
                >
                  <X size={16} />
                </span>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outlined"
            text="Add Item"
            iconPosition="left"
            icon={<PlusCircle size={16} />}
            className="!py-2"
            onClick={async () => {
              append(props.defaultValue);
              setActive(fields.length);
            }}
          />
        </div>
        {fields.map((field, index) => {
          return (
            <ControlPrefix.Provider
              key={field.id}
              value={`${props.fieldName}.${index}.`}
            >
              <FormControls
                controls={props.controls}
                errors={props.errors}
                active={index === active}
              />
            </ControlPrefix.Provider>
          );
        })}
      </>
    </div>
  );
}

type FormProps = {
  methods: UseFormReturn<any>;
} & (
  | { singleTab: true; controls: FormControl[] }
  | { singleTab?: false; tabs: FormTab[] }
);

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  (props, ref) => {
    const [tabActive, setTabActive] = React.useState(0);

    return (
      <FormProvider {...props.methods}>
        <form
          ref={ref}
          className={clsx(
            "flex flex-col gap-[18px] 2xl:gap-6 relative",
            !props.singleTab ?? "pt-[9px] 2xl:pt-3"
          )}
        >
          {props.singleTab ? (
            <FormControls
              controls={props.controls}
              active
              errors={props.methods.formState.errors}
            />
          ) : (
            <>
              <FormTabMenu
                tabs={props.tabs}
                tabActive={tabActive}
                setTabActive={setTabActive}
              />
              {props.tabs
                .filter((tab) => !tab.isHide)
                .map((tab, tabIndex) =>
                  tab.isAppend ? (
                    <FormAppend
                      key={tab.id}
                      controls={tab.controls}
                      active={tabIndex === tabActive}
                      errors={props.methods.formState.errors}
                      name={tab.itemName}
                      fieldName={tab.fieldName}
                      defaultValue={tab.defaultValue}
                    />
                  ) : (
                    <FormControls
                      key={tab.id}
                      controls={tab.controls}
                      active={tabIndex === tabActive}
                      errors={props.methods.formState.errors}
                    />
                  )
                )}
            </>
          )}
        </form>
      </FormProvider>
    );
  }
);

Form.displayName = "Form";

export default Form;
