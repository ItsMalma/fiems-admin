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
              <EmployeeListTab name={data.nama} id={data.id} />
            ))}
          </div>
        </CardBody>
      </Card>

      <Card className="col-span-5 max-h-full overflow-hidden w-full">
        <CardBody className="flex flex-col gap-[32px] w-full max-h-full overflow-clip">
          <div className="flex px-[24px] gap-[20px] w-full">
            <Image src="/hr/avatar.png" width={64} height={64} alt="avatar" />

            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col gap-[4px] items-start justify-center">
                <p className="text-[20px] font-bold leading-none">
                  Hadi Yusuf Al Ghifari
                </p>
                <p>Frontend Developer</p>
              </div>

              <Button
                endContent={<PencilSquare className="w-[16px] h-[16px]" />}
                variant="bordered"
                color="secondary"
              >
                Edit
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 px-[24px] w-full">
            <div className="flex flex-col items-center gap-[4px] w-full">
              <div className="flex items-center gap-[8px]">
                <CircleFill className="w-[12px] h-[12px] text-green-500" />
                <p className="font-bold text-3xl leading-none text-gray-800">
                  Active
                </p>
              </div>
              <p className="text-gray-500">Employee Status</p>
            </div>

            <div className="flex flex-col items-center gap-[4px] w-full">
              <div className="flex items-center gap-[8px]">
                <p className="font-bold text-3xl leading-none text-gray-800">
                  Manager
                </p>
              </div>
              <p className="text-gray-500">Human Resource</p>
            </div>

            <div className="flex flex-col items-center gap-[4px] w-full">
              <div className="flex items-center gap-[8px]">
                <p className="font-bold text-3xl leading-none text-gray-800">
                  12
                </p>
              </div>
              <p className="text-gray-500">Leaves Remaining</p>
            </div>
          </div>

          <div className="px-[24px] py-[12px] border border-gray-300 rounded-[16px] w-full flex flex-col gap-[32px] max-h-full overflow-auto">
            <div className="w-full flex gap-[8px]">
              <button className="px-[16px] py-[12px] font-semibold text-gray-800 rounded-t-[10px] border-b-[3px] border-primaryActive">
                Employee Details
              </button>
              <button className="px-[16px] py-[12px] text-gray-500 rounded-t-[10px]">
                Contact and Address
              </button>
              <button className="px-[16px] py-[12px] text-gray-500 rounded-t-[10px]">
                Family
              </button>
              <button className="px-[16px] py-[12px] text-gray-500 rounded-t-[10px]">
                Leave
              </button>
            </div>

            <div className="w-full flex flex-col gap-[4px] h-full overflow-y-scroll">
              <Input
                type="text"
                label="Full Name"
                id="full-name"
                name="full-name"
                placeholder="Full Name"
                value={": Hadi Yusuf Al Ghifari"}
                className={{ input: "bg-transparent" }}
                disabled
              />

              <Input
                type="text"
                label="Employee ID"
                id="employee-id"
                name="employee-id"
                placeholder="Employee ID"
                value={": 23948510"}
                className={{ input: "bg-transparent" }}
                disabled
              />

              <Input
                type="text"
                label="Joining Date"
                id="joining-date"
                name="joining-date"
                placeholder="Joining Date"
                value={": 17 May 2023"}
                className={{ input: "bg-transparent" }}
                disabled
              />

              <hr className="my-[16px]" />

              <Input
                type="text"
                label="NIK KTP"
                id="nik-ktp"
                name="nik-ktp"
                placeholder="NIK KTP"
                value={": 3671070712010012"}
                className={{ input: "bg-transparent" }}
                disabled
              />

              <Input
                type="text"
                label="NPWP"
                id="npwp"
                name="npwp"
                placeholder="NPWP"
                value={": -"}
                className={{ input: "bg-transparent" }}
                disabled
              />

              <hr className="my-[16px]" />

              <Input
                type="text"
                label="Place of Birth"
                id="place-of-birth"
                name="place-of-birth"
                placeholder="Place of Birth"
                value={": Bandung"}
                className={{ input: "bg-transparent" }}
                disabled
              />

              <Input
                type="text"
                label="Date of Birth"
                id="date-of-birth"
                name="date-of-birth"
                placeholder="Date of Birth"
                value={": 27 June 1999"}
                className={{ input: "bg-transparent" }}
                disabled
              />

              <Input
                type="text"
                label="Sex"
                id="sex"
                name="sex"
                placeholder="Sex"
                value={": Male"}
                className={{ input: "bg-transparent" }}
                disabled
              />

              <Input
                type="text"
                label="Blood Type"
                id="blood-type"
                name="blood-type"
                placeholder="Blood Type"
                value={": B"}
                className={{ input: "bg-transparent" }}
                disabled
              />

              <Input
                type="text"
                label="Religion"
                id="religion"
                name="religion"
                placeholder="Religion"
                value={": Islam"}
                className={{ input: "bg-transparent" }}
                disabled
              />

              <hr className="my-[16px]" />

              <Input
                type="text"
                label="Latest Education"
                id="latest-education"
                name="latest-education"
                placeholder="Latest Education"
                value={": SMK"}
                className={{ input: "bg-transparent" }}
                disabled
              />

              <Input
                type="text"
                label="Year of Graduation"
                id="year-of-graduation"
                name="year-of-graduation"
                placeholder="Year of Graduation"
                value={": 2017"}
                className={{ input: "bg-transparent" }}
                disabled
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default EmployeeList;
