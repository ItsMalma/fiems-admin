import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/Hrd/Elements";
import { getKeyValue } from "@/components/Hrd/Elements/Table";
import { timeIn } from "@/constant";
import clsx from "clsx";
import moment, { MomentInput } from "moment";
import Image from "next/image";
import {
  PlusLg,
  CheckCircle,
  ExclamationCircle,
  ChevronDoubleDown,
} from "react-bootstrap-icons";

type valuesProps = boolean & MomentInput;

const Dashboard = () => {
  const valuesConstructor = (key: string, values: valuesProps) => {
    if (key === "time_in") {
      return (
        <div className="text-center text-sm w-[40px] text-gray-500 bg-gray-200 rounded-full py-0.5">
          {moment(values).format("h:mm")}
        </div>
      );
    } else if (key === "isLate" && values === false) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    } else if (key === "isLate" && values === true) {
      return <ExclamationCircle className="w-5 h-5 text-red-500" />;
    } else {
      return values;
    }
  };

  return (
    <>
      <div className="flex gap-4">
        <Button
          startContent={
            <PlusLg className="text-inherit" height={16} width={16} />
          }
        >
          Add New Employee
        </Button>
        <Button
          startContent={
            <PlusLg className="text-inherit" height={16} width={16} />
          }
        >
          Create New Leave
        </Button>
        <Button
          startContent={
            <PlusLg className="text-inherit" height={16} width={16} />
          }
          href="/hrd/employee/list"
        >
          Employee List
        </Button>
      </div>

      <div className="flex gap-6">
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-xl">Attendance Today</h2>
            <select name="data" id="data">
              <option value="All data" selected>
                All data
              </option>
              <option value="All data">Late only</option>
              <option value="All data">On-time only</option>
            </select>
          </CardHeader>
          <CardBody>
            <Table>
              <TableBody>
                {timeIn.slice(0, 5).map((data, i) => (
                  <TableRow key={i}>
                    {getKeyValue(data).map(([key, values]) => {
                      return (
                        <TableCell
                          key={values}
                          className={clsx(
                            key === "nama" && "font-semibold",
                            key === "id" && "text-primaryActive"
                          )}
                        >
                          {valuesConstructor(key, values)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
          <CardFooter className="items-center justify-center">
            <button className="text-gray-400 flex items-center gap-1">
              view more <ChevronDoubleDown />
            </button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-xl">Leave Today</h2>
            <div>select</div>
          </CardHeader>
          <CardBody>
            <Table>
              <TableBody>
                {timeIn.slice(0, 5).map((data, i) => (
                  <TableRow key={i}>
                    {getKeyValue(data).map(([key, values]) => {
                      return (
                        <TableCell
                          key={values}
                          className={clsx(
                            key === "nama" && "font-semibold",
                            key === "id" && "text-primaryActive"
                          )}
                        >
                          {valuesConstructor(key, values)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
          <CardFooter className="items-center justify-center">
            <button className="text-gray-400 flex items-center gap-1">
              view more <ChevronDoubleDown />
            </button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-8 gap-6">
        <Card className="col-span-6">
          <CardHeader>
            <h2 className="font-semibold text-xl">Monthly Attendance Report</h2>
            <div className="flex gap-2">
              <label htmlFor="year" className="text-gray-400">
                Select year
              </label>
              <select name="year" id="year" className="text-gray-400">
                <option value="2023">2023</option>
              </select>
            </div>
          </CardHeader>
          <CardBody>
            <Image
              src="/hr/sample-chart.png"
              alt="sample chart"
              fill
              className="w-full h-auto"
            />
          </CardBody>
          <CardFooter className="items-center justify-center">
            view more
          </CardFooter>
        </Card>
        <div className="col-span-2 flex flex-col gap-6">
          <Card>
            <CardBody className="flex flex-col">
              <p className="text-[32px] font-bold">124</p>
              <p>Total Employee</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="flex flex-col">
              <p className="text-[32px] font-bold">89%</p>
              <p>On Time Percentage</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="flex flex-col">
              <p className="text-[32px] font-bold">11</p>
              <p>Leave This Year</p>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
