import clsx from "clsx";
import React from "react";

type ToastProps = {
  type: "success" | "error" | "info" | "warning";
  message: string;
  onClose?: () => void;
};

export function Toast({ onClose, ...props }: ToastProps) {
  const title = React.useMemo(() => {
    switch (props.type) {
      case "success":
        return "Success";
      case "error":
        return "Error";
      case "info":
        return "Info";
      case "warning":
        return "Warning";
    }
  }, [props.type]);

  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = React.useState(5);

  React.useEffect(() => {
    if (!timeLeft) {
      if (onClose) onClose();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [onClose, timeLeft]);

  return (
    <div
      className={clsx(
        "flex items-center bg-white rounded p-3 2xl:p-4 w-[30rem] 2xl:w-[40rem] shadow cursor-pointer",
        props.type === "success" && "border-l-8 border-green-500",
        props.type === "error" && "border-l-8 border-red-500",
        props.type === "info" && "border-l-8 border-blue-500",
        props.type === "warning" && "border-l-8 border-yellow-500"
      )}
      onClick={onClose}
    >
      <div className="flex flex-col gap-[3px] 2xl:gap-1">
        <h1 className="text-xl text-gray-700 font-bold">{title}</h1>
        <p className="text-gray-700">{props.message}</p>
      </div>
    </div>
  );
}
