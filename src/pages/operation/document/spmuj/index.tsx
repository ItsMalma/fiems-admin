import useMenu from "@/stores/menu";
import React from "react";
import VerticalLine from "@/components/Icons/VerticalLine";
import useHeader from "@/stores/header";
import {
  PersonFillAdd,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
  Pencil,
  Trash,
  Calendar,
  Filter,
} from "react-bootstrap-icons";
import { useRouter } from "next/router";
import { Button, Search, Table } from "@/components/Elements";

export default function CustomerGroup() {
  const router = useRouter();
  const { setActive } = useMenu();
  const { setTitle } = useHeader();

  React.useEffect(() => {
    setTitle("Operational | SPM & UJ");
    setActive(3, 2, 0);
  }, [setTitle, setActive]);

  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Group Code" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New SPM"
            icon={<PersonFillAdd />}
            variant="filled"
            onClick={() => router.push("/operation/document/spmuj/save")}
          />
          <Button
            text="Import"
            icon={<FileEarmarkArrowDownFill />}
            variant="outlined"
          />
          <Button
            text="Export"
            icon={<FileEarmarkArrowUpFill />}
            variant="outlined"
          />
        </div>
      </div>
      <Table
        className="p-[18px] 2xl:p-6 bg-white rounded-2xl shadow-sm"
        isSelectable
        columns={[
          {
            id: "createDate",
            header: "Create Date",
            type: "date",
            isSortable: true,
          },
          {
            id: "spmCode",
            header: "SPM Code",
            type: "code",
            isSortable: true,
          },
          {
            id: "jobOrderCode",
            header: "J.O. Code",
            type: "code",
            isSortable: true,
          },
          {
            id: "customer",
            header: "Customer",
            type: "text",
            isSortable: true,
          },
          {
            id: "consignee",
            header: "Consignee",
            type: "text",
            isSortable: true,
          },
          {
            id: "route",
            header: "Route",
            type: "text",
            isSortable: true,
          },
          {
            id: "uangJalan",
            header: "Uang Jalan",
            type: "text",
            isSortable: true,
          },
        ]}
        rows={[]}
        onSelect={(rowIndex) => setSelectedRowIndex(rowIndex)}
      />
    </>
  );
}
