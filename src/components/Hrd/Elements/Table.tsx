import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export const getKeyValue = (data: Object) => {
  const datas = Object.entries(data);

  return datas;
};

const Table = ({ children, ...props }: TableProps) => {
  return (
    <table
      {...props}
      className={twMerge(
        clsx("table-auto min-w-full w-full h-auto"),
        props.className
      )}
    >
      {children}
    </table>
  );
};

export default Table;
