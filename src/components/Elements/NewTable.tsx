import moment from "moment";
import {
  Square,
  SquareFill,
  SortAlphaDown,
  SortAlphaDownAlt,
  Pencil,
  Trash,
  Calendar,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "react-bootstrap-icons";
import lodash from "lodash";
import React from "react";
import clsx from "clsx";
import Button from "./Button";
import VerticalLine from "../Icons/VerticalLine";
import Select from "./Select";
import useModal from "@/stores/modal";
import Modal from "./Modal";

const entriesOptions = [
  { label: "Show 10 entries", value: 10 },
  { label: "Show 25 entries", value: 25 },
  { label: "Show 50 entries", value: 50 },
];

type DateRangeOption = "today" | "yesterday" | "weeksAgo";

type SortDirection = "asc" | "desc";

type SortState = {
  id: string | null;
  direction: SortDirection | null;
};

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
  className?: string;

  isSelectable?: boolean;
  onSelect?: (rowIndex: number) => void;

  columns: TableColumn[];
  rows: object[];

  onSelectDateRange?: (option: DateRangeOption) => void;

  onEdit?: (rowIndex: number) => void | Promise<void>;
  onDelete?: (rowIndex: number) => void | Promise<void>;
};

type TableHeadProps = {
  id: string;
  value: string;

  rowSpan: number;
  colSpan: number;

  sort?: SortDirection | null;

  isParent?: boolean;
  isChildren?: boolean;
  isStatus?: boolean;

  onSort?: (direction: SortDirection | null) => void;
};

// Untuk merubah columns menjadi TableHeadProps
function getHeaderRows(
  columns: TableColumn[],
  isSelectable: boolean,
  sort: SortState
): TableHeadProps[][] {
  let secondRow: TableHeadProps[] = [];

  const firstRow: TableHeadProps[] = columns.map((column) => {
    if (column.type === "group") {
      secondRow = column.columns.map((subColumn) => ({
        id: column.id + "." + subColumn.id,
        value: subColumn.header,
        colSpan: 1,
        rowSpan: 1,
        sort: subColumn.isSortable
          ? column.id + "." + subColumn.id === sort.id
            ? sort.direction
            : null
          : undefined,
        isChildren: true,
      }));

      return {
        id: column.id,
        value: column.header,
        rowSpan: 1,
        colSpan: column.columns.length,
        isParent: true,
      };
    } else {
      return {
        id: column.id,
        value: column.header,
        rowSpan: 2,
        colSpan: 1,
        sort: column.isSortable
          ? column.id === sort.id
            ? sort.direction
            : null
          : undefined,
        isStatus: column.type === "status",
      };
    }
  });

  if (isSelectable) {
    firstRow.unshift({
      id: "select",
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
          <span
            className="text-gray-700 cursor-pointer"
            onClick={() => {
              if (props.onSort) {
                props.onSort("desc");
              }
            }}
          >
            <SortAlphaDown />
          </span>
        );
      case "desc":
        return (
          <span
            className="text-gray-700 cursor-pointer"
            onClick={() => {
              if (props.onSort) {
                props.onSort(null);
              }
            }}
          >
            <SortAlphaDownAlt />
          </span>
        );
      case null:
        return (
          <span
            className="text-gray-400 cursor-pointer"
            onClick={() => {
              if (props.onSort) {
                props.onSort("asc");
              }
            }}
          >
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
          (props.isParent || props.isChildren || props.isStatus) &&
            "justify-center"
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
          (props.isChildren || props.type === "status") && "justify-center"
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
        <span className="text-gray-300 cursor-pointer" onClick={props.onSelect}>
          {props.selected ? <SquareFill /> : <Square />}
        </span>
      </div>
    </td>
  );
}

// Untuk merubah columns dan rows menjadi TableCellProps
function getCellRows(
  columns: TableColumn[],
  rows: object[],
  rowTotal: number,
  page: number
): TableCellProps[][] {
  return rows
    .map((row) => {
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
    })
    .slice((page - 1) * rowTotal, rowTotal * page);
}

export default function Table(props: TableProps) {
  const { setModal } = useModal();

  const [columns, setColumns] = React.useState(props.columns);
  React.useEffect(() => setColumns(props.columns), [props.columns]);

  const [rows, setRows] = React.useState(props.rows);
  React.useEffect(() => setRows(props.rows), [props.rows]);

  // State untuk menyimpan nilai sort (id column dan direction sort nya)
  const [sort, setSort] = React.useState<SortState>({
    id: null,
    direction: null,
  });

  // Effect untuk mengsort column
  React.useEffect(() => {
    if (sort.id === null || sort.direction === null) {
      setRows(props.rows);
      return;
    }

    setRows(lodash.orderBy(props.rows, sort.id, sort.direction));
  }, [sort, props.rows]);

  const headerRows = React.useMemo(
    () => getHeaderRows(columns, props.isSelectable ?? false, sort),
    [columns, sort]
  );

  const filterOptions = React.useMemo(() => {
    return props.columns.flatMap((column, columnIndex) => ({
      label: column.header,
      value: columnIndex,
    }));
  }, [props.columns]);

  // State untuk menyimpan jumlah row yang ditampilkan
  const [rowTotal, setRowTotal] = React.useState(10);

  // State untuk menyimpan di page berapa saat ini
  const [page, setPage] = React.useState(1);

  // Memo untuk menghitung jumlah maksimal page
  const maxPage = React.useMemo(() => {
    return Math.ceil(props.rows.length / rowTotal);
  }, [props.rows, rowTotal]);

  const cellRows = React.useMemo(
    () => getCellRows(columns, rows, rowTotal, page),
    [columns, rows, rowTotal, page]
  );

  // State untuk menyimpan row yang di-select (index dari row-nya)
  const [rowSelected, setRowSelected] = React.useState<number>();

  // Effect untuk mengtrigger function props.onSelect ketika state rowSelected berubah
  React.useEffect(() => {
    if (props.onSelect && rowSelected !== undefined) {
      props.onSelect(rowSelected);
    }
  }, [props.onSelect, rowSelected]);

  return (
    <div
      className={clsx(
        "flex flex-col gap-[18px] 2xl:gap-6 overflow-auto grow",
        props.className
      )}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button
            text="Edit"
            icon={<Pencil />}
            iconPosition="left"
            variant="normal"
            className={clsx(
              rowSelected === undefined
                ? "!border-gray-300 !text-gray-300"
                : "!border-gray-700 !text-gray-700 cursor-pointer"
            )}
            onClick={() => {
              if (rowSelected !== undefined && props.onEdit) {
                props.onEdit(rowSelected);
              }
            }}
          />
          <VerticalLine />
          <Button
            text="Delete"
            icon={<Trash />}
            iconPosition="left"
            variant="normal"
            className={clsx(
              rowSelected === undefined
                ? "!border-gray-300 !text-gray-300"
                : "!border-gray-700 !text-gray-700 cursor-pointer"
            )}
            onClick={() => {
              if (rowSelected !== undefined) {
                setModal(
                  <Modal
                    type="confirm"
                    title="Delete"
                    onDone={async () => {
                      if (props.onDelete) {
                        await Promise.resolve(props.onDelete(rowSelected));
                      }
                    }}
                    closeOnDone
                  >
                    <p className="text-lg text-gray-700 font-medium">
                      Are you sure want to delete this row?
                    </p>
                  </Modal>
                );
              }
            }}
          />
        </div>
        <div className="flex items-center gap-3 2xl:gap-4">
          <Select
            className="w-40"
            icon={Calendar}
            placeholder="Date Range"
            options={[
              { label: "Today", value: "today" },
              { label: "Yesterday", value: "yesterday" },
              { label: "Weeks Ago", value: "weeksAgo" },
            ]}
            onChange={(option) =>
              props.onSelectDateRange && props.onSelectDateRange(option.value)
            }
            isSearchable
          />
          <Select
            className="w-40"
            icon={Filter}
            placeholder="Filter"
            options={filterOptions}
            defaultValue={filterOptions}
            onChange={(options) =>
              setColumns(
                props.columns.filter((_, columnIndex) =>
                  options.includes(columnIndex)
                )
              )
            }
            isSearchable
            isMulti
          />
          <Select
            className="w-40"
            options={entriesOptions}
            defaultValue={entriesOptions.find(
              (entriesOption) => entriesOption.value === rowTotal
            )}
            onChange={(option) => {
              setRowTotal(option);
              setPage(1);
            }}
            isSearchable
          />
        </div>
      </div>
      <div className="grow flex rounded-t-2xl overflow-auto">
        {columns.length < 1 ? (
          <></>
        ) : (
          <table className="w-full h-fit rounded-t-2xl overflow-hidden whitespace-nowrap border-spacing-0 border-separate">
            <thead className="sticky top-0">
              {headerRows.map((headerRow, headerRowIndex) => (
                <tr key={headerRowIndex}>
                  {headerRow.map((header) => (
                    <TableHead
                      key={header.id}
                      {...header}
                      onSort={(direction) =>
                        setSort({ id: header.id, direction })
                      }
                    />
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {cellRows.map((cellRow, cellRowIndex) => (
                <tr key={cellRowIndex}>
                  {props.isSelectable && (
                    <TableCellSelect
                      selected={
                        cellRowIndex + (page - 1) * rowTotal == rowSelected
                      }
                      onSelect={() => {
                        const realRowIndex =
                          cellRowIndex + (page - 1) * rowTotal;
                        if (realRowIndex == rowSelected) {
                          setRowSelected(undefined);
                        } else {
                          setRowSelected(realRowIndex);
                        }
                      }}
                    />
                  )}
                  {cellRow.map((cell, cellIndex) => (
                    <TableCell key={cellIndex} {...cell} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="flex justify-end items-center gap-3 2xl:gap-4">
        <span
          className={clsx(
            page === 1 ? "text-gray-400" : "text-gray-700 cursor-pointer"
          )}
          onClick={() => setPage(page === 1 ? 1 : page - 1)}
        >
          <ChevronLeft />
        </span>
        <span className="text-gray-700 cursor-pointer">{page}</span>
        <span
          className={clsx(
            page === maxPage ? "text-gray-400" : "text-gray-700 cursor-pointer"
          )}
          onClick={() => setPage(page === maxPage ? maxPage : page + 1)}
        >
          <ChevronRight />
        </span>
      </div>
    </div>
  );
}
