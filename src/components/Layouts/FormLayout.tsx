import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Elements/Button";
import MainLayout from "./MainLayout";
import clsx from "clsx";
import { useRouter } from "next/router";

type FormLayoutTab = {
  name: string;
  component: React.ReactNode;
};

type FormLayoutProps = {
  title: string;
  tabs: FormLayoutTab[];
};

export default function FormLayout(props: FormLayoutProps) {
  const router = useRouter();

  const [tabActive, setTabActive] = React.useState(0);

  return (
    <MainLayout>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm items-center">
        <h2 className="text-gray-700  text-[15px] 2xl:text-xl font-bold">
          {props.title}
        </h2>
        <div className="flex gap-3 2xl:gap-4 items-center">
          <Button
            className="!border-gray-300 !text-gray-500"
            variant="outlined"
            text="Cancel"
            icon={
              <FontAwesomeIcon
                icon={["far", "xmark-circle"]}
                width={20}
                height={20}
              />
            }
            onClick={() => router.back()}
          />
          <Button
            variant="filled"
            text="Save"
            icon={
              <FontAwesomeIcon
                icon={["fas", "file-arrow-down"]}
                width={20}
                height={20}
              />
            }
          />
        </div>
      </div>
      <div className="p-[18px] 2xl:p-6 bg-white rounded-2xl shadow-sm grow overflow-auto">
        <div className="h-full px-[18px] pt-[9px] pb-[15px] 2xl:px-6 2xl:pt-3 2xl:pb-5 flex flex-col gap-[18px] 2xl:gap-6 border border-gray-300 rounded-2xl overflow-auto">
          <div className="flex gap-1.5 2xl:gap-2">
            {props.tabs.map((tab, tabIndex) => (
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
            ))}
          </div>
          <form className="grow overflow-auto">
            {props.tabs.map((tab, tabIndex) => (
              <div
                className={clsx(
                  "flex flex-col gap-[16px] 2xl:gap-4 overflow-auto",
                  tabActive !== tabIndex && "hidden"
                )}
              >
                {tab.component}
              </div>
            ))}
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
