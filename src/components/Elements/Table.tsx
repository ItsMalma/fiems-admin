import React from "react";
import clsx from "clsx";
import moment from "moment";
import lodash from "lodash";
import {
  SortAlphaDown,
  SortAlphaDownAlt,
  Square,
  SquareFill,
} from "react-bootstrap-icons";

type TableFieldType = "text" | "option" | "link" | "date" | "status" | "group" | "tool";

type TableSubField = Omit<TableField, "type" | "fields"> & {
  type: Exclude<TableFieldType, "option" | "group">;
};

type TableField = {
  type: TableFieldType;
  name?: string;
  isSortable?: boolean;
  isHide?: boolean;
  fields?: TableSubField[];
};

function getFieldIndex(
  tableField: TableField,
  tableFields: TableField[]
): number {
  return tableFields
    .flatMap<TableField | TableSubField[] | undefined>((v) => {
      if (v.type === "group") {
        return v.fields;
      }
      return v;
    })
    .findIndex((v) => v === tableField);
}

type TableRecord = any[];

type TableProps = {
  className?: string;
  fields: TableField[];
  records: TableRecord[];
  onOptionClicked?: (
    recordIndex: number,
    fieldIndex: number,
    value: boolean
  ) => void;
};

type TableFieldSort =
  | {
      index: number;
      direction: "asc" | "desc";
    }
  | undefined;

function isSortable(fieldType: TableFieldType): boolean {
  return (
    fieldType !== "group" && fieldType !== "option" && fieldType !== "status"
  );
}

type TableHeadProps = {
  field: TableField;
  fieldIndex: number;
  fieldSort?: TableFieldSort;
  setFieldSort: (fieldSort: TableFieldSort) => void;
  hasGroup: boolean;
  isInGroup: boolean;
};

type TableDataProps = {
  field: TableField;
  fieldIndex: number;
  record: TableRecord;
  recordIndex: number;
  onOptionClicked?: (
    recordIndex: number,
    fieldIndex: number,
    value: boolean
  ) => void;
  isInGroup: boolean;
};

function TableHead(props: TableHeadProps) {
  return (
    <th
      className={clsx(
        "text-gray-400",
        props.hasGroup && (props.field.type === "group" || props.isInGroup)
          ? "px-3 py-0.5"
          : "p-3"
      )}
      rowSpan={
        props.hasGroup && !(props.field.type === "group" || props.isInGroup)
          ? 2
          : 1
      }
      colSpan={
        props.field.type === "group" || props.isInGroup
          ? props.field.fields?.length
          : 1
      }
    >
      <div
        className={clsx(
          "flex items-center gap-2",
          props.fieldSort?.index === props.fieldIndex && "text-gray-600"
        )}
      >
        {props.field.name && props.field.type !== "option" && (
          <p
            className={clsx(
              "font-semibold",
              (props.field.type === "group" || props.isInGroup) &&
                "w-full text-center",
              props.field.type === "group" && "border-b border-b-gray-300"
            )}
          >
            {props.field.name}
          </p>
        )}
        {props.field.isSortable && isSortable(props.field.type) ? (
          props.fieldSort?.index == props.fieldIndex &&
          props.fieldSort?.direction === "desc" ? (
            <SortAlphaDownAlt
              className="cursor-pointer"
              onClick={() => {
                if (props.fieldSort?.index === props.fieldIndex) {
                  switch (props.fieldSort.direction) {
                    case "asc":
                      props.setFieldSort({
                        index: props.fieldSort.index,
                        direction: "desc",
                      });
                      break;
                    case "desc":
                      props.setFieldSort(undefined);
                      break;
                  }
                } else {
                  props.setFieldSort({
                    index: props.fieldIndex,
                    direction: "asc",
                  });
                }
              }}
            />
          ) : (
            <SortAlphaDown
              className="cursor-pointer"
              onClick={() => {
                if (props.fieldSort?.index === props.fieldIndex) {
                  switch (props.fieldSort.direction) {
                    case "asc":
                      props.setFieldSort({
                        index: props.fieldSort.index,
                        direction: "desc",
                      });
                      break;
                    case "desc":
                      props.setFieldSort(undefined);
                      break;
                  }
                } else {
                  props.setFieldSort({
                    index: props.fieldIndex,
                    direction: "asc",
                  });
                }
              }}
            />
          )
        ) : undefined}
      </div>
    </th>
  );
}

function TableData(props: TableDataProps) {
  switch (props.field.type) {
    case "text":
      return (
        <td
          key={props.fieldIndex}
          className="text-gray-700 font-medium p-3"
          align={props.isInGroup ? "center" : "left"}
        >
          {props.record[props.fieldIndex]}
        </td>
      );
    case "option":
      return (
        <td
          key={props.fieldIndex}
          className="text-gray-400 p-3"
          align={props.isInGroup ? "center" : "left"}
        >
          {props.record[props.fieldIndex] ? (
            <SquareFill
              className="cursor-pointer"
              onClick={() =>
                props.onOptionClicked &&
                props.onOptionClicked(
                  props.recordIndex,
                  props.fieldIndex,
                  !props.record[props.fieldIndex]
                )
              }
            />
          ) : (
            <Square
              className="cursor-pointer"
              onClick={() =>
                props.onOptionClicked &&
                props.onOptionClicked(
                  props.recordIndex,
                  props.fieldIndex,
                  !props.record[props.fieldIndex]
                )
              }
            />
          )}
        </td>
      );
    case "link":
      return (
        <td
          key={props.fieldIndex}
          className="p-3"
          align={props.isInGroup ? "center" : "left"}
        >
          <a className="text-primaryActive">{props.record[props.fieldIndex]}</a>
        </td>
      );
    case "date":
      return (
        <td
          key={props.fieldIndex}
          className="text-gray-700 p-3"
          align={props.isInGroup ? "center" : "left"}
        >
          {moment(props.record[props.fieldIndex]).format("DD/MM/YYYY")}
        </td>
      );
    case "status":
      return (
        <td
          key={props.fieldIndex}
          className={clsx(
            "font-medium p-3",
            props.record[props.fieldIndex]
              ? "text-statusActive"
              : "text-statusInactive"
          )}
          align={props.isInGroup ? "center" : "left"}
        >
          {props.record[props.fieldIndex] ? "Active" : "Inactive"}
        </td>
      );
    case "tool":
      return (
        <td
          key={props.fieldIndex}
        >
          {props.record[props.fieldIndex]}
        </td>
      )
    case "group":
      console.log(props.record);
      return (props.field.fields ?? [])
        .filter((field) => !field.isHide)
        .map((subField, subFieldIndex) => (
          <TableData
            field={subField}
            fieldIndex={subFieldIndex}
            record={props.record[props.fieldIndex]}
            recordIndex={props.recordIndex}
            onOptionClicked={props.onOptionClicked}
            isInGroup={true}
          />
        ));
  }
}

export default function Table(props: TableProps) {
  const [fieldSort, setFieldSort] = React.useState<TableFieldSort>(undefined);

  const hasGroup = props.fields.some((field) => field.type === "group");

  return (
    <div className={clsx("flex overflow-auto", props.className)}>
      <table className="w-full rounded-t-xl overflow-hidden whitespace-nowrap">
        <thead className="bg-gray-100">
          <tr>
            {props.fields
              .filter((field) => !field.isHide)
              .map((field) => (
                <TableHead
                  key={getFieldIndex(field, props.fields)}
                  field={field}
                  fieldIndex={getFieldIndex(field, props.fields)}
                  fieldSort={fieldSort}
                  setFieldSort={setFieldSort}
                  hasGroup={hasGroup}
                  isInGroup={false}
                />
              ))}
          </tr>
          {hasGroup && (
            <tr>
              {props.fields
                .filter((field) => field.type === "group" && !field.isHide)
                .map((field) => {
                  return (field.fields ?? []).map((subField) => (
                    <TableHead
                      key={getFieldIndex(subField, props.fields)}
                      field={subField}
                      fieldIndex={getFieldIndex(subField, props.fields)}
                      fieldSort={fieldSort}
                      setFieldSort={setFieldSort}
                      hasGroup={hasGroup}
                      isInGroup={true}
                    />
                  ));
                })}
            </tr>
          )}
        </thead>
        <tbody className="overflow-auto">
          {props.records.map((record, recordIndex) => (
            <tr key={recordIndex} className="border-b border-b-gray-300">
              {props.fields
                .filter((field) => !field.isHide)
                .map((field) => (
                  <TableData
                    key={getFieldIndex(field, props.fields)}
                    field={field}
                    fieldIndex={getFieldIndex(field, props.fields)}
                    record={record}
                    recordIndex={recordIndex}
                    onOptionClicked={props.onOptionClicked}
                    isInGroup={false}
                  />
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
