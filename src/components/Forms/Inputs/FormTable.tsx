import { Button } from "@/components/Elements";
import React from "react";
import { X } from "react-bootstrap-icons";
import { useFormContext } from "react-hook-form";
import { ControlPrefix } from "../prefix.context";

type FormTableProps = {
  id: string;
  columns: {
    id: string;
    label: string;
    input: React.ReactNode;
    isHidden?: boolean;
  }[];
  defaultValue?: any;
  disableAdd?: boolean;
};

export function FormTable(props: FormTableProps) {
  const { watch, setValue } = useFormContext();
  const fields: unknown[] = watch(props.id);

  const remove = React.useCallback(
    (index: number) => {
      setValue(
        props.id,
        fields.filter((_, fieldIndex) => fieldIndex != index)
      );
    },
    [fields, props.id, setValue]
  );

  const append = React.useCallback(() => {
    if (!props.defaultValue) return;
    setValue(props.id, [...fields, props.defaultValue]);
  }, [fields, props.defaultValue, props.id, setValue]);

  const rows = React.useMemo(() => {
    const rows = [];
    for (let rowIndex = 0; rowIndex < fields.length; rowIndex++) {
      rows.push(
        <tr key={rowIndex}>
          <td className="p-3 2xl:p-4">
            <div className="flex items-center gap-[7.5px] 2xl:gap-2.5">
              <span
                className="bg-red-600 cursor-pointer rounded-xl"
                onClick={() => remove(rowIndex)}
              >
                <X className="w-8 h-8 text-white" />
              </span>
            </div>
          </td>
          {props.columns
            .filter((column) => !column.isHidden)
            .map((column) => (
              <td key={column.id} className="p-3 2xl:p-4">
                <div className="flex flex-col gap-1">
                  <ControlPrefix.Provider
                    key={column.id}
                    value={`${props.id}.${rowIndex}.`}
                  >
                    {column.input}
                  </ControlPrefix.Provider>
                </div>
              </td>
            ))}
        </tr>
      );
    }
    return rows;
  }, [fields.length, props.columns, props.id, remove]);

  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto rounded-t-2xl">
        <table className="w-full h-full overflow-hidden whitespace-nowrap border-spacing-0 border-separate">
          <thead className="sticky top-0">
            <tr>
              <th className="bg-gray-100 dark:bg-gray-800 p-3 2xl:p-4"></th>
              {props.columns
                .filter((column) => !column.isHidden)
                .map((column) => (
                  <th
                    key={column.id}
                    className="bg-gray-100 dark:bg-gray-800 p-3 2xl:p-4"
                  >
                    <div className="flex gap-[7.5px] 2xl:gap-2.5 items-center justify-center">
                      <p className="text-gray-400 font-semibold">
                        {column.label}
                      </p>
                    </div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>{...rows}</tbody>
        </table>
        <div className="flex gap-2">
          {!props.disableAdd && (
            <Button
              type="button"
              variant="filled"
              text="Tambah"
              className="bg-green-500"
              onClick={append}
            />
          )}
        </div>
      </div>
    </div>
  );
}
