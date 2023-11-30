interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode[];
}

const TableHeader = ({ children, ...props }: TableHeaderProps) => {
  return (
    <thead {...props} className="[&>tr]:first:rounded-lg">
      <tr className="group outline-none">{children}</tr>
    </thead>
  );
};

export default TableHeader;
