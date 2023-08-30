import clsx from "clsx";
import React from "react";

type TableHeaderProps = React. {
  className?: string;
  children: React.ReactNode;
};

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({className, ...props}, ref) => {
  return (
    <thead ref={ref} className={clsx("bg-gray-100", props.className)}>
      {props.children}
    </thead>
  );
});

type TableProps = React.TableHTMLAttributes<HTMLTableElement> & {
  className?: string;
  children: React.ReactNode;
};

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (props, ref) => {
    return (
      <div className={clsx("flex overflow-auto", props.className)}>
        <table
          ref={ref}
          className="w-full rounded-t-xl overflow-hidden whitespace-nowrap"
        >
          <thead></thead>
          {props.children}
        </table>
      </div>
    );
  }
);
