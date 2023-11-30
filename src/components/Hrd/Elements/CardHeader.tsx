import clsx from "clsx";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface CardHeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
}

const CardHeader = ({ children, className, ...props }: CardHeaderProps) => {
  return (
    <div
      {...props}
      className={twMerge(
        clsx("flex items-center box-border justify-between p-3"),
        className
      )}
    >
      {children}
    </div>
  );
};

export default CardHeader;
