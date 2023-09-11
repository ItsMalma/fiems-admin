import Label from "@/components/Elements/Label";
import clsx from "clsx";
import React from "react";
import { ChevronUp } from "react-bootstrap-icons";

export default function userAccess() {
  const [all, setAll] = React.useState(-1);
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
      <div className="flex flex-col p-[18px] 2xl:p-6 bg-white rounded-2xl shadow-sm gap-[18px] 2xl:gap-6 grow overflow-auto">
        <form action="">
          <table className="w-full rounded-t-xl overflow-hidden whitespace-nowrap text-center">
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
                  {Array.isArray(row[1]) ? (
                    <>
                      <tr>
                        <td
                          className="p-3 cursor-pointer"
                          onClick={() => setSelected(rowIndex)}
                        >
                          <div className="flex w-full">
                            <Label name={row[0] as string} className="" />
                            <ChevronUp className="float-right" />
                          </div>
                        </td>
                        <td className="p-3">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            checked={all == rowIndex}
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            checked={all == rowIndex}
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            checked={all == rowIndex}
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            checked={all == rowIndex}
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            onChange={() => setAll(rowIndex)}
                          />
                        </td>
                      </tr>
                      {row[1].map((subRow, subRowIndex) => (
                        <>
                          {Array.isArray(subRow[1]) ? (
                            <>
                              <tr
                                className={clsx(
                                  "",
                                  selected !== rowIndex && "hidden"
                                )}
                              >
                                <td
                                  className="p-3"
                                  onClick={() => setSubSelected(subRowIndex)}
                                >
                                  <div className="flex w-full">
                                    <Label
                                      name={subRow[0] as string}
                                      className="pl-3"
                                    />
                                    <ChevronUp className="float-right" />
                                  </div>
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
                                <td className="p-3">
                                  <input type="checkbox" name="" id="" />
                                </td>
                                <td className="p-3">
                                  <input type="checkbox" name="" id="" />
                                </td>
                              </tr>
                              {subRow[1].map((lastRow, lastRowIndex) => (
                                <>
                                  <tr
                                    className={clsx(
                                      "",
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
                                    <td className="p-3">
                                      <input type="checkbox" name="" id="" />
                                    </td>
                                  </tr>
                                </>
                              ))}
                            </>
                          ) : (
                            <>
                              <tr
                                className={clsx(
                                  "",
                                  selected !== rowIndex && "hidden"
                                )}
                              >
                                <td className="p-3">
                                  <div className="flex">
                                    <Label
                                      name={subRow[0] as string}
                                      className="mr-auto pl-3"
                                    />
                                  </div>
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
                                <td className="p-3">
                                  <input type="checkbox" name="" id="" />
                                </td>
                                <td className="p-3">
                                  <input type="checkbox" name="" id="" />
                                </td>
                              </tr>
                            </>
                          )}
                        </>
                      ))}
                    </>
                  ) : (
                    <>
                      <tr>
                        <td className="p-3">
                          <div className="flex">
                            <Label
                              name={row[0] as string}
                              className="mr-auto"
                            />
                          </div>
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
                        <td className="p-3">
                          <input type="checkbox" name="" id="" />
                        </td>
                        <td className="p-3">
                          <input type="checkbox" name="" id="" />
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
