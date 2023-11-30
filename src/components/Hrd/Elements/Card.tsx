import clsx from "clsx";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
}

const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      {...props}
      className={twMerge(
        clsx(
          "flex flex-col box-border h-auto shadow-medium bg-white rounded-3xl p-3 w-full"
        ),
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
