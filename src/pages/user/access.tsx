import Button from "@/components/Elements/Button";
import InputText from "@/components/Elements/InputText";
import Label from "@/components/Elements/Label";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import clsx from "clsx";
import { useRouter } from "next/router";
import React from "react";
import { ChevronUp, Download, XCircle } from "react-bootstrap-icons";

export default function userAccess() {
  const router = useRouter();
  const { setActive } = useMenu();
  const { setTitle } = useHeader();

  React.useEffect(() => {
    setTitle("User Access");
    setActive(4, 0, 0);
  }, []);

  const [allSelected, setAllSelected] = React.useState<number[]>([]);
  const [subAllSelected, setSubAllSelected] = React.useState<number[]>([]);
  const [subChildrenAllSelected, setSubChildrenAllSelected] = React.useState<
    number[]
  >([]);
  const [selected, setSelected] = React.useState(-1);
  const [subSelected, setSubSelected] = React.useState(-1);
  // rows terdiri dari row, row dan children, subRow dan children
  const rows = [
    ["Dasboard"],
    [
      "Master Data",
      [
        ["Business Parter", ["Customer Group", "Customer"]],
        ["Master Route"],
        ["Master Port"],
        ["Master Sales"],
        ["Master Vehicle"],
        ["Master Vessel"],
        ["Master Price", ["Price Factory", "Price Vendor", "Price Shipping"]],
        ["Master Uang Jalan"],
        ["Master Product Category"],
        ["Master Product"],
        ["Account COA"],
      ],
    ],
    [
      "Marketing",
      [
        ["Price Calculation"],
        ["Form Quotation"],
        ["Inquiry Container"],
        ["Vessel Schedule"],
      ],
    ],
  ];

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <div className="flex gap-3 2xl:gap-4 items-center">
          <Label className="text-2xl" name="User ID" />
          <InputText disabled />
        </div>
        <div className="flex gap-3 2xl:gap-4 items-center">
          <Button
            className="!border-gray-300 !text-gray-500"
            variant="outlined"
            text="Cancel"
            icon={<XCircle />}
            onClick={() => router.back()}
          />
          <Button variant="filled" text="Save" icon={<Download />} />
        </div>
      </div>
      <div className="flex flex-col text-2xl p-[18px] 2xl:p-6 bg-white rounded-2xl shadow-sm gap-[18px] 2xl:gap-6 grow overflow-auto">
        <form action="">
          <table className="w-full rounded-t-xl text-2xl overflow-hidden whitespace-nowrap text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-gray-400">Form</th>
                <th className="p-3 text-gray-400">Read</th>
                <th className="p-3 text-gray-400">Create</th>
                <th className="p-3 text-gray-400">Edit</th>
                <th className="p-3 text-gray-400">Delete</th>
                <th className="p-3 text-gray-400">All</th>
              </tr>
            </thead>
            <tbody className="overflow-auto text-gray-600">
              {rows.map((row, rowIndex) => (
                <>
                  {/* Main Row */}
                  {Array.isArray(row[1]) ? (
                    <>
                      <tr className="border-b border-b-gray-300">
                        <td
                          className="p-3 cursor-pointer"
                          onClick={() => {
                            if (selected == rowIndex) {
                              setSelected(-1);
                              setSubSelected(-1);
                            } else {
                              setSelected(rowIndex);
                            }
                            if (selected !== rowIndex) {
                              setSubSelected(-1);
                            }
                          }}
                        >
                          <div className="flex w-full">
                            <Label name={row[0]} className="" />
                            <ChevronUp className="float-right" />
                          </div>
                        </td>
                        {allSelected.includes(rowIndex) ? (
                          <>
                            <td className="p-3">
                              <input
                                type="checkbox"
                                name=""
                                id=""
                                checked={true}
                              />
                            </td>
                            <td className="p-3">
                              <input
                                type="checkbox"
                                name=""
                                id=""
                                checked={true}
                              />
                            </td>
                            <td className="p-3">
                              <input
                                type="checkbox"
                                name=""
                                id=""
                                checked={true}
                              />
                            </td>
                            <td className="p-3">
                              <input
                                type="checkbox"
                                name=""
                                id=""
                                checked={true}
                              />
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="p-3">
                              <input type="checkbox" name="" id="" />
                            </td>
                            <td className="p-3">
                              <input type="checkbox" name="" id="" />
                            </td>
                            <td className="p-3">
                              <input type="checkbox" name="" id="" />
                            </td>
                            <td className="p-3">
                              <input type="checkbox" name="" id="" />
                            </td>
                          </>
                        )}
                        <td className="p-3">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            onChange={() => {
                              if (allSelected.includes(rowIndex)) {
                                setAllSelected(
                                  allSelected.filter((item) => item != rowIndex)
                                );
                              } else {
                                setAllSelected([...allSelected, rowIndex]);
                              }
                            }}
                          />
                        </td>
                      </tr>
                      {/* Sub Row */}
                      {row[1].map((subRow, subRowIndex) => (
                        <>
                          {Array.isArray(subRow[1]) ? (
                            <>
                              <tr
                                className={clsx(
                                  "border-b border-b-gray-300",
                                  selected !== rowIndex && "hidden"
                                )}
                              >
                                <td
                                  className="p-3"
                                  onClick={() => {
                                    if (subSelected == subRowIndex) {
                                      setSubSelected(-1);
                                    } else setSubSelected(subRowIndex);
                                  }}
                                >
                                  <div className="flex w-full">
                                    <Label name={subRow[0]} className="pl-3" />
                                    <ChevronUp className="float-right" />
                                  </div>
                                </td>
                                {subAllSelected.includes(subRowIndex) ? (
                                  <>
                                    <td className="p-3">
                                      <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        checked={true}
                                      />
                                    </td>
                                    <td className="p-3">
                                      <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        checked={true}
                                      />
                                    </td>
                                    <td className="p-3">
                                      <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        checked={true}
                                      />
                                    </td>
                                    <td className="p-3">
                                      <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        checked={true}
                                      />
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td className="p-3">
                                      <input type="checkbox" name="" id="" />
                                    </td>
                                    <td className="p-3">
                                      <input type="checkbox" name="" id="" />
                                    </td>
                                    <td className="p-3">
                                      <input type="checkbox" name="" id="" />
                                    </td>
                                    <td className="p-3">
                                      <input type="checkbox" name="" id="" />
                                    </td>
                                  </>
                                )}
                                <td className="p-3">
                                  <input
                                    type="checkbox"
                                    name=""
                                    id=""
                                    onChange={() => {
                                      if (
                                        subAllSelected.includes(subRowIndex)
                                      ) {
                                        setSubAllSelected(
                                          subAllSelected.filter(
                                            (item) => item != subRowIndex
                                          )
                                        );
                                      } else {
                                        setSubAllSelected([
                                          ...subAllSelected,
                                          subRowIndex,
                                        ]);
                                      }
                                    }}
                                  />
                                </td>
                              </tr>
                              {/* Sub Row Children */}
                              {subRow[1].map((lastRow, lastRowIndex) => (
                                <>
                                  <tr
                                    className={clsx(
                                      "border-b border-b-gray-300",
                                      subSelected !== subRowIndex && "hidden"
                                    )}
                                  >
                                    <td className="p-3">
                                      <div className="flex">
                                        <Label
                                          name={lastRow}
                                          className="pl-6"
                                        />
                                      </div>
                                    </td>
                                    {subChildrenAllSelected.includes(
                                      lastRowIndex
                                    ) ? (
                                      <>
                                        <td className="p-3">
                                          <input
                                            type="checkbox"
                                            name=""
                                            id=""
                                            checked={true}
                                          />
                                        </td>
                                        <td className="p-3">
                                          <input
                                            type="checkbox"
                                            name=""
                                            id=""
                                            checked={true}
                                          />
                                        </td>
                                        <td className="p-3">
                                          <input
                                            type="checkbox"
                                            name=""
                                            id=""
                                            checked={true}
                                          />
                                        </td>
                                        <td className="p-3">
                                          <input
                                            type="checkbox"
                                            name=""
                                            id=""
                                            checked={true}
                                          />
                                        </td>
                                      </>
                                    ) : (
                                      <>
                                        <td className="p-3">
                                          <input
                                            type="checkbox"
                                            name=""
                                            id=""
                                          />
                                        </td>
                                        <td className="p-3">
                                          <input
                                            type="checkbox"
                                            name=""
                                            id=""
                                          />
                                        </td>
                                        <td className="p-3">
                                          <input
                                            type="checkbox"
                                            name=""
                                            id=""
                                          />
                                        </td>
                                        <td className="p-3">
                                          <input
                                            type="checkbox"
                                            name=""
                                            id=""
                                          />
                                        </td>
                                      </>
                                    )}
                                    <td className="p-3">
                                      <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        onChange={() => {
                                          if (
                                            subChildrenAllSelected.includes(
                                              lastRowIndex
                                            )
                                          ) {
                                            setSubChildrenAllSelected(
                                              subChildrenAllSelected.filter(
                                                (item) => item != lastRowIndex
                                              )
                                            );
                                          } else {
                                            setSubChildrenAllSelected([
                                              ...subChildrenAllSelected,
                                              lastRowIndex,
                                            ]);
                                          }
                                        }}
                                      />
                                    </td>
                                  </tr>
                                </>
                              ))}
                            </>
                          ) : (
                            <>
                              <tr
                                className={clsx(
                                  "border-b border-b-gray-300",
                                  selected !== rowIndex && "hidden"
                                )}
                              >
                                <td className="p-3">
                                  <div className="flex">
                                    <Label
                                      name={subRow[0]}
                                      className="mr-auto pl-3"
                                    />
                                  </div>
                                </td>
                                {subAllSelected.includes(subRowIndex) ? (
                                  <>
                                    <td className="p-3">
                                      <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        checked={true}
                                      />
                                    </td>
                                    <td className="p-3">
                                      <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        checked={true}
                                      />
                                    </td>
                                    <td className="p-3">
                                      <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        checked={true}
                                      />
                                    </td>
                                    <td className="p-3">
                                      <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        checked={true}
                                      />
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td className="p-3">
                                      <input type="checkbox" name="" id="" />
                                    </td>
                                    <td className="p-3">
                                      <input type="checkbox" name="" id="" />
                                    </td>
                                    <td className="p-3">
                                      <input type="checkbox" name="" id="" />
                                    </td>
                                    <td className="p-3">
                                      <input type="checkbox" name="" id="" />
                                    </td>
                                  </>
                                )}
                                <td className="p-3">
                                  <input
                                    type="checkbox"
                                    name=""
                                    id=""
                                    onChange={() => {
                                      if (
                                        subAllSelected.includes(subRowIndex)
                                      ) {
                                        setSubAllSelected(
                                          subAllSelected.filter(
                                            (item) => item != subRowIndex
                                          )
                                        );
                                      } else {
                                        setSubAllSelected([
                                          ...subAllSelected,
                                          subRowIndex,
                                        ]);
                                      }
                                    }}
                                  />
                                </td>
                              </tr>
                            </>
                          )}
                        </>
                      ))}
                    </>
                  ) : (
                    <>
                      <tr className="border-b border-b-gray-300">
                        <td className="p-3">
                          <div className="flex">
                            <Label name={row[0]} className="mr-auto" />
                          </div>
                        </td>
                        {allSelected.includes(rowIndex) ? (
                          <>
                            <td className="p-3">
                              <input
                                type="checkbox"
                                name=""
                                id=""
                                checked={true}
                              />
                            </td>
                            <td className="p-3">
                              <input
                                type="checkbox"
                                name=""
                                id=""
                                checked={true}
                              />
                            </td>
                            <td className="p-3">
                              <input
                                type="checkbox"
                                name=""
                                id=""
                                checked={true}
                              />
                            </td>
                            <td className="p-3">
                              <input
                                type="checkbox"
                                name=""
                                id=""
                                checked={true}
                              />
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="p-3">
                              <input type="checkbox" name="" id="" />
                            </td>
                            <td className="p-3">
                              <input type="checkbox" name="" id="" />
                            </td>
                            <td className="p-3">
                              <input type="checkbox" name="" id="" />
                            </td>
                            <td className="p-3">
                              <input type="checkbox" name="" id="" />
                            </td>
                          </>
                        )}
                        <td className="p-3">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            onChange={() => {
                              if (allSelected.includes(rowIndex)) {
                                setAllSelected(
                                  allSelected.filter((item) => item != rowIndex)
                                );
                              } else {
                                setAllSelected([...allSelected, rowIndex]);
                              }
                            }}
                          />
                        </td>
                      </tr>
                    </>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
}
