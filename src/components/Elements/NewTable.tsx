import useModal from "@/stores/modal";
import clsx from "clsx";
import lodash from "lodash";
import moment from "moment";
import React from "react";
import {
  Backspace,
  Calendar,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Filter,
  Pencil,
  SortAlphaDown,
  SortAlphaDownAlt,
  Square,
  SquareFill,
  Trash,
} from "react-bootstrap-icons";
import { Button, Loading, Modal, Select } from ".";
import VerticalLine from "../Icons/VerticalLine";

const entriesOptions = [
  { label: "Show 10 entries", value: "10" },
  { label: "Show 25 entries", value: "25" },
  { label: "Show 50 entries", value: "50" },
];

type DateRangeOption = "today" | "yesterday" | "weeksAgo";

type SortDirection = "asc" | "desc";

type SortState = {
  id: string | null;
  direction: SortDirection | null;
};

type ColumnType = "code" | "date" | "text" | "status" | "money";

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

  onEdit?: (rowIndex: number) => void | Promise<void>;
  onDelete?: (rowIndex: number) => void | Promise<void>;
  onRevice?: (rowIndex: number) => void | Promise<void>;
  onPindahKapal?: (rowIndex: number) => void | Promise<void>;
  onConfirm?: (rowIndex: number) => void | Promise<void>;

  isLoading?: boolean;

  search?: string;
  dateRangeColumn?: string;
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
      secondRow.push(
        ...column.columns.map((subColumn) => ({
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
        }))
      );

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
            className="text-gray-700 dark:text-white cursor-pointer"
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
            className="text-gray-700 dark:text-white cursor-pointer"
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
        "bg-gray-100 dark:bg-gray-800 p-3 2xl:p-4",
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
  | {
      type: "money";
      value: number;
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
        return (
          <p className="text-gray-700 font-medium">{props.value || "-"}</p>
        );
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
      case "money":
        return (
          <p className="text-gray-700 font-medium">
            {Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(Number(props.value))}
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
  page: number,
  dateRangeValue: string,
  search?: string,
  dateRangeColumn?: string
): TableCellProps[][] {
  return rows
    .filter((row) => {
      if (dateRangeColumn) {
        const dateRange = moment(lodash.get(row, dateRangeColumn));
        if (dateRangeValue === "today" && !dateRange.isSame(moment(), "day")) {
          return null;
        } else if (
          dateRangeValue === "yesterday" &&
          !dateRange.isSame(moment().subtract(1, "days"), "day")
        ) {
          return null;
        } else if (
          dateRangeValue === "weeksAgo" &&
          !dateRange.isSame(moment().subtract(1, "weeks"), "week")
        ) {
          return null;
        }
      }
      return true;
    })
    .map((row) => {
      return columns.flatMap<TableCellProps>((column) => {
        if (column.type === "group") {
          return column.columns.map((subColumn) => ({
            type: subColumn.type,
            value: lodash.get(row, [column.id, subColumn.id].join(".")),
            isChildren: true,
          }));
        }

        return {
          type: column.type,
          value: lodash.get(row, column.id),
        };
      });
    })
    .filter((row) => {
      if (search) {
        return row.some((cell) => {
          let strCellValue = String(cell.value).toLowerCase();
          if (cell.type === "date") {
            strCellValue = moment(strCellValue).format("DD/MM/YYYY");
          }
          return strCellValue.includes(search.toLowerCase());
        });
      }
      return true;
    })
    .slice((page - 1) * rowTotal, rowTotal * page);
}

export function Table(props: TableProps) {
  const { setModal } = useModal();

  const [columns, setColumns] = React.useState(props.columns);
  React.useEffect(() => {
    // temporary: remove status
    setColumns(props.columns.filter((c) => c.type !== "status"));
  }, [props.columns]);

  const [rows, setRows] = React.useState(props.rows);
  React.useEffect(() => setRows(props.rows), [props.rows]);

  const [dateRangeValue, setDateRangeValue] = React.useState("");

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
    [columns, props.isSelectable, sort]
  );

  const filterOptions = React.useMemo(() => {
    return props.columns.flatMap((column, columnIndex) => ({
      label: column.header,
      value: columnIndex.toString(),
    }));
  }, [props.columns]);
  const [filterValue, setFilterValue] = React.useState(
    React.useMemo(
      () => filterOptions.map((option) => option.value),
      [filterOptions]
    )
  );

  // State untuk menyimpan jumlah row yang ditampilkan
  const [rowTotal, setRowTotal] = React.useState(10);

  // State untuk menyimpan di page berapa saat ini
  const [page, setPage] = React.useState(1);

  // Memo untuk menghitung jumlah maksimal page
  const maxPage = React.useMemo(() => {
    const n = Math.ceil(props.rows.length / rowTotal);

    // Untuk mencegah NaN
    return isNaN(n) ? 1 : n;
  }, [props.rows, rowTotal]);

  // Effect untuk membuat page berada di page akhir
  // ketika terjadi perubahan pada maxPage
  React.useEffect(() => {
    setPage(maxPage);
  }, [maxPage]);

  const cellRows = React.useMemo(
    () =>
      getCellRows(
        columns,
        rows,
        rowTotal,
        page,
        dateRangeValue,
        props.search,
        props.dateRangeColumn
      ),
    [
      columns,
      rows,
      rowTotal,
      page,
      dateRangeValue,
      props.search,
      props.dateRangeColumn,
    ]
  );

  // State untuk menyimpan row yang di-select (index dari row-nya)
  const [rowSelected, setRowSelected] = React.useState<number>();

  // Effect untuk mengtrigger function props.onSelect ketika state rowSelected berubah
  React.useEffect(() => {
    if (props.onSelect && rowSelected !== undefined) {
      props.onSelect(rowSelected);
    }
  }, [props, rowSelected]);

  // Callback untuk handle perubahan pada filter
  const handleFilterChange = React.useCallback(
    (optionsValue: string[]) => {
      setFilterValue(optionsValue);
      setColumns(
        props.columns.filter((_, columnIndex) =>
          optionsValue.includes(columnIndex.toString())
        )
      );
    },
    [props.columns]
  );

  return (
    <div
      className={clsx(
        "flex flex-col gap-[18px] 2xl:gap-6 overflow-auto grow",
        props.className
      )}
    >
      {props.isLoading ? (
        <Loading size="xl" color="primary" />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {props.onEdit && (
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
              )}
              {props.onDelete && (
                <>
                  {props.onEdit && <VerticalLine />}
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
                                await Promise.resolve(
                                  props.onDelete(rowSelected)
                                );
                              }
                            }}
                          >
                            <p className="text-lg text-gray-700 font-medium">
                              Are you sure want to delete this row?
                            </p>
                          </Modal>
                        );
                      }
                    }}
                  />
                </>
              )}
              {props.onRevice && (
                <>
                  {(props.onEdit || props.onDelete) && <VerticalLine />}
                  <Button
                    text="Revice"
                    icon={<Backspace />}
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
                            title="Revice"
                            onDone={async () => {
                              if (props.onRevice) {
                                await Promise.resolve(
                                  props.onRevice(rowSelected)
                                );
                              }
                            }}
                          >
                            <p className="text-lg text-gray-700 font-medium">
                              Are you sure want to revice this row?
                            </p>
                          </Modal>
                        );
                      }
                    }}
                  />
                </>
              )}
              {props.onConfirm && (
                <>
                  {(props.onEdit || props.onDelete || props.onRevice) && (
                    <VerticalLine />
                  )}
                  <Button
                    text="Confirm"
                    icon={<CheckSquare />}
                    iconPosition="left"
                    variant="normal"
                    className={clsx(
                      rowSelected === undefined
                        ? "!border-gray-300 !text-gray-300"
                        : "!border-gray-700 !text-gray-700 cursor-pointer"
                    )}
                    onClick={() => {
                      if (rowSelected !== undefined && props.onConfirm) {
                        props.onConfirm(rowSelected);
                      }
                    }}
                  />
                </>
              )}
              {props.onPindahKapal && (
                <>
                  {(props.onEdit ||
                    props.onDelete ||
                    props.onRevice ||
                    props.onConfirm) && <VerticalLine />}
                  <Button
                    text="Pindah Kapal"
                    icon={<Pencil />}
                    iconPosition="left"
                    variant="normal"
                    className={clsx(
                      rowSelected === undefined
                        ? "!border-gray-300 !text-gray-300"
                        : "!border-gray-700 !text-gray-700 cursor-pointer"
                    )}
                    onClick={() => {
                      if (rowSelected !== undefined && props.onPindahKapal) {
                        props.onPindahKapal(rowSelected);
                      }
                    }}
                  />
                </>
              )}
            </div>
            <div className="flex items-center gap-3 2xl:gap-4">
              <Select
                className="w-40"
                icon={Calendar}
                placeholder="Date Range"
                value={dateRangeValue}
                options={[
                  { label: "Today", value: "today" },
                  { label: "Yesterday", value: "yesterday" },
                  { label: "Weeks Ago", value: "weeksAgo" },
                ]}
                onChange={setDateRangeValue}
                isSearchable
              />
              <Select
                className="w-40"
                icon={Filter}
                placeholder="Filter"
                options={filterOptions}
                value={filterValue}
                onChange={handleFilterChange}
                isSearchable
                isMulti
              />
              <Select
                className="w-40"
                options={entriesOptions}
                onChange={(option) => {
                  setRowTotal(Number(option));
                  setPage(1);
                }}
                value={
                  entriesOptions.find(
                    (entriesOption) =>
                      entriesOption.value === rowTotal.toString()
                  )?.value ?? ""
                }
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
                              setRowSelected(realRowIndex);
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
                page === maxPage
                  ? "text-gray-400"
                  : "text-gray-700 cursor-pointer"
              )}
              onClick={() => setPage(page === maxPage ? maxPage : page + 1)}
            >
              <ChevronRight />
            </span>
          </div>
        </>
      )}
    </div>
  );
}
