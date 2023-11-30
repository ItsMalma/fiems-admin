import clsx from "clsx";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface CardBodyProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
}

const CardBody = ({ children, className, ...props }: CardBodyProps) => {
  return (
    <div
      {...props}
      className={twMerge(
        clsx("flex box-border items-start p-3 h-full relative"),
        className
      )}
    >
      {children}
    </div>
  );
};

export default CardBody;
