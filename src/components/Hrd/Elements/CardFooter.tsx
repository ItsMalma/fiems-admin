import clsx from "clsx";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface CardFooterProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
}

const CardFooter = ({ children, className, ...props }: CardFooterProps) => {
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

export default CardFooter;
