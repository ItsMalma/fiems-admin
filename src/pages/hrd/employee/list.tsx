import { Button, Card, CardBody, Input } from "@/components/Hrd/Elements";
import React from "react";
import { PersonFillAdd } from "react-bootstrap-icons";

const EmployeeList = () => {
  return (
    <div>
      <Card>
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
    </div>
  );
};

export default EmployeeList;
