interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode[];
}

const TableBody = ({ children }: TableBodyProps) => {
  return <tbody>{children}</tbody>;
};

export default TableBody;
