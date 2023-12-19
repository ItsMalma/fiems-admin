import { Button, Modal, Search, Table } from "@/components/Elements";
import { Form, FormDate } from "@/components/Forms";
import { trpc } from "@/libs/trpc";
import {
  DooringConfirmForm,
  dooringConfirmValidationSchema,
} from "@/server/dtos/dooring.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React from "react";
import {
  EnvelopePaperFill,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
} from "react-bootstrap-icons";
import { useForm } from "react-hook-form";

function Confirm({
  id,
  bongkarKapal,
  estimate,
}: {
  id: string;
  bongkarKapal: Date | string;
  estimate: Date | string;
}) {
  const { setModal } = useModal();

  const methods = useForm<DooringConfirmForm>({
    resolver: zodResolver(dooringConfirmValidationSchema),
  });
  const values = methods.watch();
  const { reset } = methods;

  React.useEffect(() => {
    reset({
      bongkarKapal,
      estimate,
    });
  }, [reset, bongkarKapal, estimate]);

  const confirmMutation = trpc.doorings.confirm.useMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    await confirmMutation.mutateAsync({
      id,
      ...data,
    });

    setModal(null);
  });

  return (
    <Modal
      title="Confirm Dooring"
      type="save"
      onDone={onSubmit}
      isLoading={!values}
    >
      <Form
        methods={methods}
        singleTab
        controls={[
          {
            type: "input",
            id: "bongkarKapal",
            label: "Bongkar Kapal",
            input: <FormDate name="bongkarKapal" readOnly />,
          },
          {
            type: "input",
            id: "estimate",
            label: "Estimation",
            input: <FormDate name="estimate" readOnly />,
          },
          {
            type: "input",
            id: "actual",
            label: "Actual",
            input: <FormDate name="actual" />,
          },
        ]}
      />
    </Modal>
  );
}

export default function DooringPage() {
  const { setTitle } = useHeader();
  const { setActive } = useMenu();
  React.useEffect(() => {
    setTitle("Operational | Dooring");
    setActive(2, 8, 0);
  }, [setTitle, setActive]);

  const { setModal, current } = useModal();

  const router = useRouter();

  const [search, setSearch] = React.useState("");
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  const tableRowsQuery = trpc.doorings.getTableRows.useQuery();
  React.useEffect(() => {
    tableRowsQuery.refetch();
  }, [current, tableRowsQuery]);

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Dooring" onChange={setSearch} />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Dooring"
            icon={<EnvelopePaperFill />}
            variant="filled"
            onClick={() => router.push("/operational/dooring/save")}
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
            id: "createDate",
            header: "Create Date",
            type: "date",
            isSortable: true,
          },
          {
            id: "jobOrder",
            header: "Job Order",
            type: "text",
            isSortable: true,
          },
          {
            id: "suratJalan",
            header: "Surat Jalan",
            type: "text",
            isSortable: true,
          },
          {
            id: "td",
            header: "TD",
            type: "date",
            isSortable: true,
          },
          {
            id: "ta",
            header: "TA",
            type: "date",
            isSortable: true,
          },
          {
            id: "sandar",
            header: "Sandar",
            type: "date",
            isSortable: true,
          },
          {
            id: "bongkarKapal",
            header: "Bongkar Kapal",
            type: "date",
            isSortable: true,
          },
          {
            id: "estimate",
            header: "Estimation",
            type: "date",
            isSortable: true,
          },
          {
            id: "actual",
            header: "Actual",
            type: "date",
            isSortable: true,
          },
        ]}
        search={search}
        dateRangeColumn="createDate"
        rows={tableRowsQuery.data ?? []}
        onSelect={(rowIndex) => setSelectedRowIndex(rowIndex)}
        onConfirm={async () => {
          if (
            selectedRowIndex === undefined ||
            tableRowsQuery.data === undefined
          ) {
            return;
          }

          const dooring = tableRowsQuery.data[selectedRowIndex];

          setModal(
            <Confirm
              id={dooring.id}
              bongkarKapal={dooring.bongkarKapal}
              estimate={dooring.estimate}
            />
          );
        }}
      />
    </>
  );
}
