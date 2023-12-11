import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
} from "@/components/Hrd/Elements";
import { timeIn } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  ChevronRight,
  CircleFill,
  PencilSquare,
  PersonFillAdd,
} from "react-bootstrap-icons";

const EmployeeListTab = ({ name, id }: { name: string; id: number }) => {
  return (
    <div className="relative rounded-[16px] overflow-hidden group">
      <Link
        href={`/hrd/employee/list/${id}`}
        className="py-[12px] px-[16px] flex w-full bg-transparent cursor-pointer hover:bg-gray-100"
      >
        <div className="pl-[36px] pr-[16px] items-center flex gap-3">
          <Image
            src={"/hr/avatar.png"}
            width={40}
            height={40}
            alt="avatar"
            className="rounded-full"
          />

          <div className="flex flex-col items-start gap-[2px]">
            <p className="font-semibold">{name}</p>
            <p className="text-xs">{id}</p>
          </div>
        </div>
      </Link>
      <button
        type="button"
        className="absolute top-1/2 -translate-y-1/2 w-[16px] left-[16px] h-[16px] border border-gray-300 z-10 rounded-[4px] hover:bg-gray-300 hover:border-none cursor-pointer"
      >
        <span className="sr-only">select</span>
      </button>
      <div className="absolute top-1/2 -translate-y-1/2 right-[16px] invisible group-hover:visible">
        <ChevronRight className="w-[16px] h-[16px] text-gray-500" />
      </div>
    </div>
  );
};

const EmployeeList = () => {
  return (
    <div className="grid grid-cols-8 gap-x-6 gap-y-6 h-full place-content-start">
      <Card className="col-span-8 h-fit">
        <CardBody className="flex justify-between">
          <Input
            placeholder="Search employee name or ID"
            inputType="search"
            className={{ container: "max-w-[339px]" }}
          />

          <div>
            <Button endContent={<PersonFillAdd className="w-5 h-5" />}>
              Add New Emlpoyee
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card className="col-span-3 max-h-full overflow-auto">
        <CardHeader className="h-fit">
          <h2 className="text-xl font-bold text-gray-800">Employee List</h2>

          <select name="filter" id="filter" placeholder="All Data">
            <option value="All Data">All Data</option>
            <option value="On-time">On-time</option>
          </select>
        </CardHeader>
        <CardBody className="h-full overflow-y-scroll">
          <div className="w-full h-full">
            {timeIn.map((data) => (
              <EmployeeListTab name={data.nama} id={data.id} key={data.id} />
            ))}
          </div>
        </CardBody>
      </Card>

      <Card className="col-span-5 max-h-full overflow-hidden w-full">
        <CardBody className="flex flex-col gap-[32px] w-full h-full overflow-clip items-center justify-center">
          <span className="text-gray-300 text-lg">Choose employee</span>
        </CardBody>
      </Card>
    </div>
  );
};

export default EmployeeList;
