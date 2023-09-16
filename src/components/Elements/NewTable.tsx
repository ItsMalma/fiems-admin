import moment from "moment";
import {
  Square,
  SquareFill,
  SortAlphaDown,
  SortAlphaDownAlt,
} from "react-bootstrap-icons";
import lodash from "lodash";
import React from "react";
import clsx from "clsx";

type SortDirection = "asc" | "desc";

type ColumnType = "code" | "date" | "text" | "status";

type TableSubColumn = {
  id: string;
  header: string;
  type: ColumnType;
  isSortable?: boolean;
};

type TableColumn = {
  id: string;
  header: string;
} & (
  | {
      type: ColumnType;
      isSortable?: boolean;
    }
  | {
      type: "group";
      columns: TableSubColumn[];
    }
);

type TableProps = {
  isSelectable?: boolean;
  onSelect?: (rowIndex: number) => void;

  columns: TableColumn[];
  rows: object[];
};

type TableHeadProps = {
  value: string;
  rowSpan: number;
  colSpan: number;
  sort?: SortDirection | null;
  isParent?: boolean;
  isChildren?: boolean;
};

function getHeaderRows(
  columns: TableColumn[],
  isSelectable: boolean
): TableHeadProps[][] {
  let secondRow: TableHeadProps[] = [];

  const firstRow: TableHeadProps[] = columns.map((column) => {
    if (column.type === "group") {
      secondRow = column.columns.map((subColumn) => ({
        value: subColumn.header,
        colSpan: 1,
        rowSpan: 1,
        sort: subColumn.isSortable ? null : undefined,
        isChildren: true,
      }));

      return {
        value: column.header,
        rowSpan: 1,
        colSpan: column.columns.length,
        isParent: true,
      };
    } else {
      return {
        value: column.header,
        rowSpan: 2,
        colSpan: 1,
        sort: column.isSortable ? null : undefined,
      };
    }
  });

  if (isSelectable) {
    firstRow.unshift({
      value: "",
      rowSpan: 2,
      colSpan: 1,
    });
  }

  return [firstRow, secondRow];
}

function TableHead(props: TableHeadProps) {
  function TableHeadSort() {
    switch (props.sort) {
      case "asc":
        return (
          <span className="text-gray-700">
            <SortAlphaDown />
          </span>
        );
      case "desc":
        return (
          <span className="text-gray-700">
            <SortAlphaDownAlt />
          </span>
        );
      case null:
        return (
          <span className="text-gray-400">
            <SortAlphaDown />
          </span>
        );
      default:
        <></>;
    }
  }

  return (
    <th
      className={clsx(
        "bg-gray-100 p-3 2xl:p-4",
        (props.isParent || props.isChildren) && "py-0.5",
        props.isParent && "border-b border-b-gray-300"
      )}
      rowSpan={props.rowSpan}
      colSpan={props.colSpan}
    >
      <div
        className={clsx(
          "flex gap-[7.5px] 2xl:gap-2.5 items-center",
          (props.isParent || props.isChildren) && "justify-center"
        )}
      >
        <p className="text-gray-400 font-semibold">{props.value}</p>
        <TableHeadSort />
      </div>
    </th>
  );
}

type TableCell = {};

type TableCellProps = (
  | {
      type: ColumnType;
      value: string;
    }
  | {
      type: "date";
      value: Date;
    }
  | {
      type: "status";
      value: boolean;
    }
) & {
  isChildren?: boolean;
};

function TableCell(props: TableCellProps) {
  function TableCellText() {
    switch (props.type) {
      case "date":
        return (
          <p className="text-gray-700">
            {moment(props.value).format("DD/MM/YYYY")}
          </p>
        );
      case "code":
        return <p className="text-primaryActive">{props.value}</p>;
      case "text":
        return <p className="text-gray-700 font-medium">{props.value}</p>;
      case "status":
        return (
          <p
            className={clsx(
              "font-semibold",
              props.value ? "text-statusActive" : "text-statusInactive"
            )}
          >
            {props.value ? "Active" : "Inactive"}
          </p>
        );
    }
  }

  return (
    <td className="p-3 2xl:p-4">
      <div
        className={clsx(
          "flex items-center gap-[7.5px] 2xl:gap-2.5",
          props.isChildren && "justify-center"
        )}
      >
        <TableCellText />
      </div>
    </td>
  );
}

type TableCellSelectProps = {
  selected: boolean;
  onSelect: () => void;
};

function TableCellSelect(props: TableCellSelectProps) {
  return (
    <td className="p-3 2xl:p-4">
      <div className="flex items-center gap-[7.5px] 2xl:gap-2.5">
        <span className="text-gray-300" onClick={props.onSelect}>
          {props.selected ? <SquareFill /> : <Square />}
        </span>
      </div>
    </td>
  );
}

function getCellRows(
  columns: TableColumn[],
  rows: object[]
): TableCellProps[][] {
  return rows.map((row) => {
    return columns.flatMap<TableCellProps>((column) => {
      if (column.type === "group") {
        return column.columns.map((subColumn) => ({
          type: subColumn.type,
          value: lodash.get(row, [column.id, subColumn.id]),
          isChildren: true,
        }));
      }

      return {
        type: column.type,
        value: lodash.get(row, column.id),
      };
    });
  });
}

export default function Table(props: TableProps) {
  const headerRows = React.useMemo(
    () => getHeaderRows(props.columns, props.isSelectable ?? false),
    [props.columns]
  );

  const cellRows = React.useMemo(
    () => getCellRows(props.columns, props.rows),
    [props.columns, props.rows]
  );

  const [rowSelected, setRowSelected] = React.useState<number>();

  return (
    <div className="flex overflow-auto">
      <table className="w-full rounded-t-2xl overflow-hidden whitespace-nowrap border-spacing-0">
        <thead>
          {headerRows.map((headerRow, headerRowIndex) => (
            <tr key={headerRowIndex}>
              {headerRow.map((header, headerIndex) => (
                <TableHead key={headerIndex} {...header} />
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {cellRows.map((cellRow, cellRowIndex) => (
            <tr key={cellRowIndex}>
              {props.isSelectable && (
                <TableCellSelect
                  selected={cellRowIndex == rowSelected}
                  onSelect={() => setRowSelected(cellRowIndex)}
                />
              )}
              {cellRow.map((cell, cellIndex) => (
                <TableCell key={cellIndex} {...cell} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
