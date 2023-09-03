import React from "react";
import Button from "../Elements/Button";
import clsx from "clsx";
import { useRouter } from "next/router";
import { XCircle, PlusCircle, Download } from "react-bootstrap-icons";

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
};

export default function FormLayout(props: FormLayoutProps) {
  const router = useRouter();
  const [appends, setAppend] = React.useState<number[]>([]);
  const [tabActive, setTabActive] = React.useState(0);
  const [appendActive, setAppendActive] = React.useState(0);

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
          <Button variant="filled" text="Save" icon={<Download />} />
        </div>
      </div>
      <div className="p-[18px] 2xl:p-6 bg-white rounded-2xl shadow-sm grow overflow-auto">
        <div className="h-full px-[18px] pt-[9px] pb-[15px] 2xl:px-6 2xl:pt-3 2xl:pb-5 flex flex-col gap-[18px] 2xl:gap-6 border border-gray-300 rounded-2xl overflow-auto relative">
          <div className="flex gap-1.5 2xl:gap-2">
          {props.tabs.map((tab, tabIndex) => (
            <>
            {!tab.isHide 
            ? (
              <>
                <Button
                  variant="normal"
                  text={tab.name}
                  className={clsx(
                    "font-normal !text-gray-500 !rounded-none",
                    tabActive === tabIndex &&
                      "border-b-[3px] border-b-primaryActive !font-semibold !text-gray-800"
                  )}
                  onClick={() => setTabActive(tabIndex)}
                />
              </>) 
              : 
                (null) 
              }
            </>
          ))}
          </div>
          <div className="flex gap-6 overflow-auto">
            {/* Khusus Append */}
            {props.tabs.map((tab, tabIndex) => (
              <div
                className={clsx(
                  "flex flex-col gap-[16px] 2xl:gap-4 overflow-auto",
                  tabActive !== tabIndex && "hidden"
                )}
              >
                {tab.isAppend && (
                  <>
                    {appends.map((index, indexx) => (
                      <Button
                        text={`${tab.append} ${indexx + 1}`}
                        type="button"
                        icon={
                          <XCircle
                            onClick={() =>
                              setAppend(
                                appends.filter(
                                  (append, appendIndex) =>
                                    appendIndex !== indexx
                                )
                              )
                            }
                            className="text-red-600"
                          />
                        }
                        iconPosition="right"
                        variant="normal"
                        onClick={() => setAppendActive(indexx)}
                        className="!gap-12 !text-gray-500 hover:border hover:border-gray-300"
                      />
                    ))}
                    <Button
                      type="button"
                      icon={<PlusCircle />}
                      iconPosition="center"
                      variant="outlined"
                      onClick={() =>
                        setAppend([...appends, appends.length + 1])
                      }
                      className="text-center !px-16"
                    />
                  </>
                )}
              </div>
            ))}
            {/* End Khusus Append */}
            <form className="grow overflow-auto">
              {props.tabs.map((tab, tabIndex) => (
                <div
                  className={clsx(
                    "flex flex-col gap-[16px] 2xl:gap-4 overflow-auto",
                    tabActive !== tabIndex && "hidden"
                  )}
                >
                  {tab.isAppend ? (
                    <>
                      {appends.map((index, indexx) => (
                        <div
                          className={clsx("flex flex-col overflow-auto", appendActive !== indexx && "hidden")}
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
