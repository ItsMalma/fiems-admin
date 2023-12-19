import clsx from "clsx";
import { useRouter } from "next/router";
import React from "react";
import { CheckCircle, Download, Pencil, XCircle } from "react-bootstrap-icons";
import { Button, Loading } from "../Elements";

type SaveLayoutProps = {
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
  onSave: () => void | Promise<void>;
} & (
  | { isConfirm?: false }
  | {
      isConfirm: true;
      onEdit: () => void | Promise<void>;
    }
);

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
          {props.isConfirm && (
            <Button
              type="button"
              variant="outlined"
              text="Edit"
              icon={<Pencil />}
              onClick={async () => await Promise.resolve(props.onEdit())}
            />
          )}
          <Button
            type="button"
            variant="filled"
            text={props.isConfirm ? "Confirm" : "Save"}
            icon={props.isConfirm ? <CheckCircle /> : <Download />}
            onClick={async () => await Promise.resolve(props.onSave())}
          />
        </div>
      </div>
      <div className="p-[18px] 2xl:p-6 bg-white rounded-2xl shadow-sm grow overflow-auto">
        {props.isLoading && <Loading size="lg" color="primary" />}
        <div
          className={clsx(
            "flex flex-col h-full px-[18px] pb-[15px] 2xl:px-6 2xl:pb-5 border border-gray-300 rounded-2xl relative overflow-auto",
            props.isLoading && "hidden"
          )}
        >
          {props.children}
        </div>
      </div>
    </>
  );
}
