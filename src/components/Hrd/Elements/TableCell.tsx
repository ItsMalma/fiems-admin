import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

const TableCell = ({ children, className, ...props }: TableCellProps) => {
  return (
    <td
      {...props}
      className={twMerge(
        clsx("py-3 px-4 align-middle whitespace-normal font-normal relative"),
        className
      )}
    >
      {children}
    </td>
  );
};

export default TableCell;
