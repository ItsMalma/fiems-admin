import { Button, Search, Table } from "@/components/Elements";
import { trpc } from "@/libs/trpc";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import { useRouter } from "next/router";
import React from "react";
import {
  CurrencyDollar,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
} from "react-bootstrap-icons";

export default function QuotationPage() {
  // Gunakan store useHeader untuk mengset judul di header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu yang aktif
  const { setActive } = useMenu();

  // Gunakan store useModal untuk mengset modal dan mendapatkan modal yang aktif
  const { setModal } = useModal();

  // Effect untuk mengset judul header dan mengset menu yang aktif
  React.useEffect(() => {
    setTitle("Marketing | Form Quotation");
    setActive(1, 1, 0);
  }, [setTitle, setActive]);

  // State untuk search
  const [search, setSearch] = React.useState("");

  // Mendapatkan router
  const router = useRouter();

  // State untuk menyimpan index dari baris yang dipilih di table
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  const tableRowsQuery = trpc.quotations.getTableRows.useQuery({
    completed: false,
  });

  const deleteMutation = trpc.quotations.deleteDetail.useMutation();

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Quotation" onChange={setSearch} />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Quotation"
            icon={<CurrencyDollar />}
            variant="filled"
            onClick={() => router.push("/marketing/quotation/save")}
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
            header: "Quotation Number",
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
            id: "serviceType",
            header: "Service Type",
            type: "text",
          },
          {
            id: "sales",
            header: "Sales",
            type: "text",
            isSortable: true,
          },
          {
            id: "customer",
            header: "Customer",
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
            id: "port",
            header: "Port",
            type: "text",
            isSortable: true,
          },
          {
            id: "containerSize",
            header: "Container Size",
            type: "text",
          },
          {
            id: "containerType",
            header: "Container Type",
            type: "text",
          },
          {
            id: "trackingAsal",
            header: "Tracking Asal",
            type: "money",
            isSortable: true,
          },
          {
            id: "trackingTujuan",
            header: "Tracking Tujuan",
            type: "money",
            isSortable: true,
          },
          {
            id: "shippingDetail",
            header: "Shipping Detail",
            type: "money",
            isSortable: true,
          },
          {
            id: "otherExpanses",
            header: "Other Expanses",
            type: "money",
            isSortable: true,
          },
          {
            id: "ppftz",
            header: "PPFTZ",
            type: "money",
            isSortable: true,
          },
          {
            id: "ppftzStatus",
            header: "PPFTZ Status",
            type: "text",
          },
          {
            id: "insurance",
            header: "Insurance",
            type: "money",
            isSortable: true,
          },
          {
            id: "insuranceStatus",
            header: "Insurance Status",
            type: "text",
          },
          {
            id: "ppn",
            header: "PPN",
            type: "text",
          },
          {
            id: "hargaJual",
            header: "Harga Jual",
            type: "money",
            isSortable: true,
          },
          {
            id: "status",
            header: "Status",
            type: "status",
          },
        ]}
        search={search}
        dateRangeColumn="createDate"
        rows={tableRowsQuery.data ?? []}
        onSelect={(rowIndex) => setSelectedRowIndex(rowIndex)}
        onEdit={() => {
          // Cek apakah tidak ada baris yang dipilih dari table
          if (
            selectedRowIndex === undefined ||
            tableRowsQuery.data === undefined
          ) {
            return;
          }

          const quotation = tableRowsQuery.data[selectedRowIndex];

          // Redirect ke halaman save price vendor
          router.push(`/marketing/quotation/save?number=${quotation.number}`);
        }}
        onDelete={async () => {
          // Cek apakah tidak ada baris yang dipilih dari table
          if (
            selectedRowIndex === undefined ||
            tableRowsQuery.data === undefined
          ) {
            return;
          }

          const quotation = tableRowsQuery.data[selectedRowIndex];

          // Hapus price vendor yang dipilih di table
          await deleteMutation.mutateAsync(quotation.detailID);

          // Karena price vendor yang dipilih telah dihapus, maka set ulang baris yang dipilih di table
          setSelectedRowIndex(undefined);

          // Tutup modal
          setModal(null);
        }}
        onConfirm={async () => {
          // Cek apakah tidak ada baris yang dipilih dari table
          if (
            selectedRowIndex === undefined ||
            tableRowsQuery.data === undefined
          ) {
            return;
          }

          const quotation = tableRowsQuery.data[selectedRowIndex];

          // Redirect ke halaman save price vendor
          router.push(
            `/marketing/quotation/save?number=${quotation.number}&id=${quotation.detailID}`
          );
        }}
      />
    </>
  );
}
