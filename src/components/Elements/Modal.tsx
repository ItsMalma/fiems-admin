import Button from "./Button";
import useModal from "@/stores/modal";
import clsx from "clsx";
import { SaveFill, X } from "react-bootstrap-icons";

type ModalType = "info" | "save" | "import" | "confirm";

type ModalProps = {
  className?: string;
  title: string;
  type: ModalType;
  children: React.ReactNode;
  onDone: () => void | Promise<void>;
  closeOnDone?: boolean;
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

export default function Modal(props: ModalProps) {
  const { setModal } = useModal();

  let doneText = getDoneText(props.type);

  const close = async () => {
    if (props.onClose) {
      await Promise.resolve(props.onClose());
    }
    setModal(null);
  };

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
      <div className="grow">{props.children}</div>
      {props.type !== "info" && (
        <div className="flex justify-end gap-3">
          <Button
            variant="filled"
            icon={props.type === "confirm" ? null : <SaveFill />}
            text={doneText}
            onClick={async () => {
              await Promise.resolve(props.onDone());
              if (props.closeOnDone) {
                await close();
              }
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
