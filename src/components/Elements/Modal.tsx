import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import useModal from "@/stores/modal";
import clsx from "clsx";

type ModalProps = {
  className?: string;
  title: string;
  type: "info" | "save" | "import";
  children: React.ReactNode;
  onDone: () => void;
};

export default function Modal(props: ModalProps) {
  const { setModal } = useModal();

  return (
    <div
      className={clsx(
        "flex flex-col p-6 gap-6 bg-white rounded-2xl", props.className
      )}
    >
      <div className="flex items-center">
        <h1 className="text-gray-700 text-xl font-bold flex-grow">{props.title}</h1>
        <FontAwesomeIcon
          icon={["fas", "xmark"]} 
          className="cursor-pointer text-gray-300"
          onClick={() => setModal(null)}
        />
      </div>
      <div className="grow">
        {props.children}
      </div>
      {props.type !== "info" && (
        <div className="flex justify-end gap-3">
          <Button
            variant="filled"
            icon={<FontAwesomeIcon icon={["fas", "file-arrow-down"]} />}
            text={props.type === "import" ? "Import" : "Save"}
            onClick={() => props.onDone()}
          />
        </div>
      )}
    </div>
  );
}