import React, { useEffect } from "react";
import Button from "../Elements/Button";
import clsx from "clsx";
import { useRouter } from "next/router";
import { XCircle, PlusCircle, Download } from "react-bootstrap-icons";
import Label from "../Elements/Label";

type InputCol = {
  label: string;
  input: React.ReactNode;
  error?: string;
};

type InputRowProps = {
  firstCol?: InputCol | string;
  secondCol?: InputCol | string;
};

export function InputRow(props: InputRowProps) {
  return (
    <div className="flex gap-[18px] 2xl:gap-6">
      <div className="flex flex-col gap-1 basis-1/2">
        {props.firstCol &&
          (typeof props.firstCol === "string" ? (
            <h1 className="text-gray-800 font-bold text-2xl">
              {props.firstCol}
            </h1>
          ) : (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <Label className="basis-2/5" name={props.firstCol.label} />
                {props.firstCol.input}
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <span className="basis-2/5"></span>
                <p className="basis-3/5 text-statusInactive">
                  {props.firstCol.error}
                </p>
              </div>
            </>
          ))}
      </div>

      <div className="flex flex-col gap-1 basis-1/2">
        {props.secondCol &&
          (typeof props.secondCol === "string" ? (
            <h1 className="text-gray-800 font-bold text-2xl">
              {props.secondCol}
            </h1>
          ) : (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <Label className="basis-2/5" name={props.secondCol.label} />
                {props.secondCol.input}
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <span className="basis-2/5"></span>
                <p className="basis-3/5 text-statusInactive">
                  {props.secondCol.error}
                </p>
              </div>
            </>
          ))}
      </div>
    </div>
  );
}

type FormLayoutTab = {
  name: string;
  component: React.ReactNode;
  isHide?: boolean;
  isAppend?: boolean;
  append?: string;
};

type FormLayoutProps = {
  title: string;
  tabs: FormLayoutTab[];
  onSave: () => void | Promise<void>;
};

export default function FormLayout(props: FormLayoutProps) {
  const router = useRouter();
  const [appends, setAppend] = React.useState<number[]>([0]);
  const [appendForm, setAppendForm] = React.useState<number[]>([0]);
  const [tabActive, setTabActive] = React.useState(0);
  const [appendActive, setAppendActive] = React.useState(0);
  const [maxNumber, setMaxNumber] = React.useState<number>(0);

  useEffect(() => {
    setMaxNumber(Math.max(...appends));
  }, [appends]);

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm items-center">
        <h2 className="text-gray-700  text-[15px] 2xl:text-xl font-bold">
          {props.title}
        </h2>
        <div className="flex gap-3 2xl:gap-4 items-center">
          <Button
            className="!border-gray-300 !text-gray-500"
            variant="outlined"
            text="Cancel"
            icon={<XCircle />}
            onClick={() => router.back()}
          />
          <Button
            type="button"
            variant="filled"
            text="Save"
            icon={<Download />}
            onClick={async () => await Promise.resolve(props.onSave())}
          />
        </div>
      </div>
      <div className="p-[18px] 2xl:p-6 bg-white rounded-2xl shadow-sm grow overflow-hidden">
        <div className="h-full px-[18px] pt-[9px] pb-[15px] 2xl:px-6 2xl:pt-3 2xl:pb-5 flex flex-col gap-[18px] 2xl:gap-6 border border-gray-300 rounded-2xl relative">
          <div className="flex gap-1.5 2xl:gap-2">
            {props.tabs
              .filter((tab) => !tab.isHide)
              .map((tab, tabIndex) => (
                <Button
                  key={tabIndex}
                  variant="normal"
                  text={tab.name}
                  className={clsx(
                    "font-normal !text-gray-500 !rounded-none",
                    tabActive === tabIndex &&
                      "border-b-[3px] border-b-primaryActive !font-semibold !text-gray-800"
                  )}
                  onClick={() => setTabActive(tabIndex)}
                />
              ))}
          </div>
          <div className="flex gap-6 overflow-auto grow">
            {/* Khusus Append */}
            {props.tabs.map((tab, tabIndex) => (
              <div
                key={tabIndex}
                className={clsx(
                  "flex flex-col gap-[16px] 2xl:gap-4 overflow-auto basis-0",
                  tabActive !== tabIndex && "hidden",
                  tab.isAppend && "!basis-[18%]"
                )}
              >
                {tab.isAppend && (
                  <>
                    {appends.map((index, indexx) => (
                      <>
                        {appends.length > 1 ? (
                          <>
                            <Button
                              text={`${tab.append} ${indexx + 1}`}
                              type="button"
                              icon={
                                <XCircle
                                  onClick={() => {
                                    setAppend(
                                      appends.filter(
                                        (append, appendIndex) =>
                                          appendIndex !== indexx
                                      )
                                    );
                                    setAppendForm(
                                      appendForm.filter(
                                        (append, appendIndex) =>
                                          appendIndex !== indexx
                                      )
                                    );
                                  }}
                                  className="text-red-600 ps-auto"
                                />
                              }
                              iconPosition="right"
                              variant="normal"
                              onClick={() => {
                                if (appendForm[indexx] == indexx) {
                                  setAppendActive(indexx);
                                } else {
                                  setAppendActive(indexx + maxNumber);
                                }
                              }}
                              className=" !text-gray-500 hover:border hover:border-gray-300 !justify-between"
                            />
                          </>
                        ) : (
                          <>
                            <Button
                              text={`${tab.append} ${indexx + 1}`}
                              type="button"
                              iconPosition="right"
                              variant="normal"
                              onClick={() => {
                                if (appendForm[indexx] == indexx) {
                                  setAppendActive(indexx);
                                } else {
                                  setAppendActive(indexx + maxNumber);
                                }
                              }}
                              className=" !text-gray-500 hover:border hover:border-gray-300 !justify-between"
                            />
                          </>
                        )}
                      </>
                    ))}
                    <Button
                      type="button"
                      icon={<PlusCircle />}
                      iconPosition="center"
                      variant="outlined"
                      onClick={() => {
                        const maxNumber = Math.max(...appends);
                        setAppend([...appends, maxNumber + 1]);
                        setAppendForm([...appendForm, maxNumber + 1]);
                      }}
                      className="text-center"
                    />
                  </>
                )}
              </div>
            ))}
            {/* End Khusus Append */}
            <form className="grow overflow-auto">
              {props.tabs.map((tab, tabIndex) => (
                <div
                  key={tabIndex}
                  className={clsx(
                    "h-full flex flex-col gap-[16px] 2xl:gap-4 overflow-auto relative",
                    tabActive !== tabIndex && "hidden"
                  )}
                >
                  {tab.isAppend ? (
                    <>
                      {appends
                        .filter(
                          (item, index) => appendForm[index] == appends[index]
                        )
                        .map((index, indexx) => (
                          <div
                            key={index}
                            className={clsx(
                              appendForm[indexx] == indexx
                                ? appendActive !== indexx && "hidden"
                                : appendActive != indexx + maxNumber && "hidden"
                            )}
                          >
                            {tab.component}
                          </div>
                        ))}
                    </>
                  ) : (
                    <>{tab.component}</>
                  )}
                </div>
              ))}
            </form>
          </div>
        </div>
        {/* MARK */}
      </div>
    </>
  );
}
