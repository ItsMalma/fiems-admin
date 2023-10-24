import clsx from "clsx";
import lodash from "lodash";
import React from "react";
import { FieldErrors, FormProvider, UseFormReturn } from "react-hook-form";
import { Button, Label } from "../Elements";

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
  controls: FormControl[];
  isHide?: boolean;
};

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
        "grid grid-cols-1 lg:grid-cols-2 gap-x-[18px] 2xl:gap-x-6 gap-y-3 2xl:gap-y-4 overflow-auto",
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
          {!props.singleTab && (
            <FormTabMenu
              tabs={props.tabs}
              tabActive={tabActive}
              setTabActive={setTabActive}
            />
          )}
          {props.singleTab ? (
            <FormControls
              controls={props.controls}
              active
              errors={props.methods.formState.errors}
            />
          ) : (
            props.tabs
              .filter((tab) => !tab.isHide)
              .map((tab, tabIndex) => (
                <FormControls
                  key={tab.id}
                  controls={tab.controls}
                  active={tabIndex === tabActive}
                  errors={props.methods.formState.errors}
                />
              ))
          )}
        </form>
      </FormProvider>
    );
  }
);

Form.displayName = "Form";

export default Form;
