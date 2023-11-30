interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode[];
}

const TableRow = ({ children, ...props }: TableRowProps) => {
  return (
    <tr {...props} className="group outline-none">
      {children}
    </tr>
  );
};

export default TableRow;
