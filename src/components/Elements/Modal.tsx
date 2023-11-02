import useModal from "@/stores/modal";
import clsx from "clsx";
import React from "react";
import { SaveFill, X } from "react-bootstrap-icons";
import { Button, Loading } from ".";

type ModalType = "info" | "save" | "import" | "confirm";

type ModalProps = {
  className?: string;
  title: string;
  type: ModalType;
  children: React.ReactNode;
  isLoading?: boolean;
  onDone: () => void | Promise<void>;
  onClose?: () => void | Promise<void>;
};

function getDoneText(modalType: ModalType): string {
  switch (modalType) {
    case "save":
      return "Save";
    case "import":
      return "Import";
    case "confirm":
      return "Yes";
  }
  return "";
}

export function Modal(props: ModalProps) {
  const { setModal } = useModal();

  let doneText = getDoneText(props.type);

  const close = async () => {
    if (props.onClose) {
      await Promise.resolve(props.onClose());
    }
    setModal(null);
  };

  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div
      className={clsx(
        "flex flex-col p-6 gap-6 bg-white rounded-2xl",
        props.className
      )}
    >
      <div className="flex items-center">
        <h1 className="text-gray-700 text-xl font-bold flex-grow">
          {props.title}
        </h1>
        <X
          className="cursor-pointer text-gray-300 w-6 h-6"
          onClick={async () => await close()}
        />
      </div>
      <div className="grow">
        {props.isLoading ? (
          <Loading size="lg" color="primary" />
        ) : (
          props.children
        )}
      </div>
      {props.type !== "info" && (
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="filled"
            icon={props.type === "confirm" ? null : <SaveFill />}
            text={doneText}
            isLoading={isLoading}
            onClick={async () => {
              Promise.resolve(props.onDone()).finally(() => {
                setIsLoading(false);
              });
              setIsLoading(true);
            }}
          />
          {props.type === "confirm" && (
            <Button
              variant="outlined"
              text="No"
              onClick={() => setModal(null)}
            />
          )}
        </div>
      )}
    </div>
  );
}
