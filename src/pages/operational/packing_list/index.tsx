import { Button, Search, Table } from "@/components/Elements";
import { trpc } from "@/libs/trpc";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import { useRouter } from "next/router";
import React from "react";
import {
  EnvelopePaperFill,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
} from "react-bootstrap-icons";

export default function PackingListPage() {
  const { setTitle } = useHeader();
  const { setActive } = useMenu();
  React.useEffect(() => {
    setTitle("Operational | Packing List");
    setActive(2, 5, 0);
  }, [setTitle, setActive]);

  const { setModal, current } = useModal();

  const router = useRouter();

  const [search, setSearch] = React.useState("");
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  const tableRowsQuery = trpc.packingLists.getTableRows.useQuery();
  React.useEffect(() => {
    tableRowsQuery.refetch();
  }, [current, tableRowsQuery]);

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Packing List" onChange={setSearch} />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Packing List"
            icon={<EnvelopePaperFill />}
            variant="filled"
            onClick={() => router.push("/operational/packing_list/save")}
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
            onClick={() => {}}
          />
        </div>
      </div>
      <Table
        className="p-[18px] 2xl:p-6 bg-white rounded-2xl shadow-sm"
        isSelectable
        columns={[
          {
            id: "number",
            header: "Packing List Number",
            type: "code",
            isSortable: true,
          },
          {
            id: "createDate",
            header: "Create Date",
            type: "date",
            isSortable: true,
          },
          {
            id: "vessel",
            header: "Vessel",
            type: "text",
            isSortable: true,
          },
        ]}
        search={search}
        dateRangeColumn="createDate"
        rows={tableRowsQuery.data ?? []}
        onSelect={(rowIndex) => setSelectedRowIndex(rowIndex)}
      />
    </>
  );
}
