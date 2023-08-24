import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import moment from "moment";

type TableFieldType = "text" | "option" | "link" | "date" | "status" | "group";

type TableField = {
  type: TableFieldType;
  name?: string;
  isSortable?: boolean;
  fields?: (Omit<TableField, "type" | "fields"> & {
    type: Exclude<TableFieldType, "option" | "group">;
  })[];
};

type TableRecord = any[];

type TableProps = {
  fields: TableField[];
  records: TableRecord[];
  onOptionClicked?: (recordIndex: number, fieldIndex: number, value: boolean) => void;
};

type TableFieldSort = {
  index: number;
  direction: "asc" | "desc";
} | undefined;

function isSortable(fieldType: TableFieldType): boolean {
  return fieldType !== "group" && fieldType !== "option" && fieldType !== "status";
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
  onOptionClicked?: (recordIndex: number, fieldIndex: number, value: boolean) => void;
  isInGroup: boolean;
};

function TableHead(props: TableHeadProps) {
  return (
    <th
      className={clsx(
        "text-gray-400",
        props.hasGroup && (props.field.type === "group" || props.isInGroup) ? "px-3 py-0.5" : "p-3"
      )}
      rowSpan={props.hasGroup && !(props.field.type === "group" || props.isInGroup) ? 2 : 1}
      colSpan={props.field.type === "group" || props.isInGroup ? props.field.fields?.length : 1}
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
              (props.field.type === "group" || props.isInGroup) && "w-full text-center",
              props.field.type === "group" && "border-b border-b-gray-300"
            )}
          >
            {props.field.name}
          </p>
        )}
        {props.field.isSortable && isSortable(props.field.type) && (
          <FontAwesomeIcon
            icon={["fas", props.fieldSort?.index === props.fieldIndex && props.fieldSort?.direction === "desc" ? "arrow-down-wide-short" : "arrow-down-short-wide"]}
            className="cursor-pointer"
            onClick={() => {
              if (props.fieldSort?.index === props.fieldIndex) {
                switch (props.fieldSort.direction) {
                  case "asc":
                    props.setFieldSort({index: props.fieldSort.index, direction: "desc"});
                    break;
                  case "desc":
                    props.setFieldSort(undefined);
                  break;
                }
              } else {
                props.setFieldSort({index: props.fieldIndex, direction: "asc"});
              }
            }}
          />
        )}
      </div>
    </th>
  )
}

function TableData(props: TableDataProps) {
  switch (props.field.type) {
    case "text": 
      return (
        <td key={props.fieldIndex} className="text-gray-700 font-medium p-3" align={props.isInGroup ? "center" : "left"}>
          {props.record[props.fieldIndex]}
        </td>
      );
    case "option":
      return (
        <td key={props.fieldIndex} className="text-gray-400 p-3" align={props.isInGroup ? "center" : "left"}>
          <FontAwesomeIcon
            icon={[props.record[props.fieldIndex] ? "fas" : "far", "square"]}
            className="cursor-pointer"
            onClick={() => props.onOptionClicked && props.onOptionClicked(props.recordIndex, props.fieldIndex, !props.record[props.fieldIndex])}
          />
        </td>
      );
    case "link":
      return (
        <td key={props.fieldIndex} className="p-3" align={props.isInGroup ? "center" : "left"}>
          <a className="text-primaryActive">{props.record[props.fieldIndex]}</a>
        </td>
      );
    case "date":
      return (
        <td key={props.fieldIndex} className="text-gray-700 p-3" align={props.isInGroup ? "center" : "left"}>
          {moment(props.record[props.fieldIndex]).format("DD/MM/YYYY")}
        </td>
      );
    case "status":
      return (
        <td
          key={props.fieldIndex}
          className={clsx(
            "font-medium p-3",
            props.record[props.fieldIndex] ? "text-statusActive" : "text-statusInactive"
          )}
          align={props.isInGroup ? "center" : "left"}
        >
          {props.record[props.fieldIndex] ? "Active" : "Inactive"}
        </td>
      )
    case "group":
      return (props.field.fields ?? []).map((subField, subFieldIndex) => (
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

  const hasGroup = props.fields.some(field => field.type === "group");

  return (
    <div className="overflow-auto">
      <table className="w-full rounded-t-xl whitespace-nowrap">
        <thead className="bg-gray-100">
          <tr>
            {props.fields.map((field, fieldIndex) => (
              <TableHead
                key={fieldIndex}
                field={field}
                fieldIndex={fieldIndex}
                fieldSort={fieldSort}
                setFieldSort={setFieldSort}
                hasGroup={hasGroup}
                isInGroup={false}
              />
            ))}
          </tr>
          {hasGroup && (
            <tr>
              {props.fields.filter(field => field.type === "group").map(field => field.fields).reduce((prev, next) => (prev ?? []).concat(next ?? []))?.map((subField, subFieldIndex) => (
                <TableHead
                  key={subFieldIndex}
                  field={subField}
                  fieldIndex={subFieldIndex}
                  fieldSort={fieldSort}
                  setFieldSort={setFieldSort}
                  hasGroup={hasGroup}
                  isInGroup={true}
                />
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {props.records.map((record, recordIndex) => (
            <tr key={recordIndex} className="border-b border-b-gray-300">
              {props.fields.map((field, fieldIndex) => (
                <TableData
                  field={field}
                  fieldIndex={fieldIndex}
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