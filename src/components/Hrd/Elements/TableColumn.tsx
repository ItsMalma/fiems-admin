import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface TableColumnProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {}

const TableColumn = ({ children, className, ...props }: TableColumnProps) => {
  return (
    <th
      {...props}
      className={twMerge(
        clsx(
          "group px-4 h-[40px] text-left align-middle bg-gray-100 text-gray-400 whitespace-nowrap font-semibold first:rounded-tl-[16px] last:rounded-tr-[16px]"
        ),
        className
      )}
    >
      {children}
    </th>
  );
};

export default TableColumn;
