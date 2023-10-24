import { useRouter } from "next/router";
import React from "react";
import { Download, XCircle } from "react-bootstrap-icons";
import { Button, Label, Loading } from "../Elements";

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

type SaveLayoutProps = {
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
  onSave: () => void | Promise<void>;
};

export default function SaveLayout(props: SaveLayoutProps) {
  const router = useRouter();

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
      <div className="p-[18px] 2xl:p-6 bg-white rounded-2xl shadow-sm grow overflow-auto">
        <div className="h-full px-[18px] pb-[15px] 2xl:px-6 2xl:pb-5 border border-gray-300 rounded-2xl relative overflow-auto">
          {props.isLoading ? (
            <Loading size="lg" color="primary" />
          ) : (
            props.children
          )}
        </div>
        {/* MARK */}
      </div>
    </>
  );
}
