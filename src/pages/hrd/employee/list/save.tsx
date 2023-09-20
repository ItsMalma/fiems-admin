import React from "react";
import useMenu from "@/stores/menu";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import FormLayout from "@/components/Layouts/FormLayout";
import Select from "@/components/Elements/Select";
import DatePicker from "@/components/Elements/DatePicker";
import { DashCircle, PlusCircle } from "react-bootstrap-icons";

export default function COASave() {
  const { setActive } = useMenu();
  const [marritalStatus, setMarritalStatus] = React.useState();
  const [siblings, setSiblings] = React.useState<number[]>([]);

  React.useEffect(() => {
    setActive(4, 0, 0);
  }, []);

  return (
    <FormLayout
      title="Input Employee Data"
      tabs={[
        {
          name: "Employee Details",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Full Name" className="basis-2/5" />
                  <InputText placeholder="Enter full name" className="basis-3/5" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Employee ID" className="basis-2/5" />
                  <InputText
                    className="basis-3/5"
                    readOnly
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Joining Date" className="basis-2/5" />
                  <DatePicker className="basis-3/5"/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="End Date" className="basis-2/5" />
                  <DatePicker className="basis-3/5"/>
                  {/* End Date diisi tidak wajib */}
                </div>
              </div>
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="NIK" className="basis-2/5" />
                  <InputText placeholder="Enter NIK number" className="basis-3/5" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="NPWP" className="basis-2/5" />
                  <InputText
                    placeholder="Enter NPWP number"
                    className="basis-3/5"
                  />
                </div>
              </div>
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Place of birth" className="basis-2/5" />
                  <InputText placeholder="Enter place of birth" className="basis-3/5" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Date of birth" className="basis-2/5" />
                  <DatePicker className="basis-3/5"/>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Sex" className="basis-2/5" />
                  <Select
                    placeholder="Choose sex"
                    options={[
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                    ]}
                    onChange={() => {}}
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                <Label name="Blood Type" className="basis-2/5" />
                  <Select
                    placeholder="Choose blood type"
                    options={[
                      { label: "AB", value: "ab" },
                      { label: "A", value: "a" },
                      { label: "B", value: "b" },
                      { label: "O", value: "o" },
                    ]}
                    onChange={() => {}}
                    className="basis-3/5"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Religion" className="basis-2/5" />
                  <Select
                    placeholder="Choose religion"
                    options={[
                      { label: "Islam", value: "islam" },
                      { label: "Christianity", value: "christianity" },
                      { label: "Hinduism", value: "hinduism" },
                      { label: "Buddhism", value: "buddhism" },
                    ]}
                    onChange={() => {}}
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
              </div>
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Joining Date" className="basis-2/5" />
                  <Select
                    placeholder="Latest education"
                    options={[
                      { label: "Islam", value: "islam" },
                      { label: "Christianity", value: "christianity" },
                      { label: "Hinduism", value: "hinduism" },
                      { label: "Buddhism", value: "buddhism" },
                    ]}
                    onChange={() => {}}
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Year of graduation" className="basis-2/5" />
                  <DatePicker className="basis-3/5"/>
                </div>
              </div>
            </>
          ),
        },
        {
          name: "Contact and Address",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Phone Number" className="basis-2/5" />
                  <InputText placeholder="Enter phone number" className="basis-3/5" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Email" className="basis-2/5" />
                  <InputText
                    placeholder="Enter email address"
                    className="basis-3/5"
                    
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Emergency Cont. No." className="basis-2/5" />
                  <InputText placeholder="Enter emergency contact number" className="basis-3/5" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Emergency Cont. Name" className="basis-2/5" />
                  <InputText
                    placeholder="Enter emergency contact name"
                    className="basis-3/5"
                    
                  />
                </div>
              </div>
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Address" className="basis-2/5" />
                  <InputText placeholder="Enter address" className="basis-3/5" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Emergency Kelurahan" className="basis-2/5" />
                  <InputText
                    placeholder="Enter kelurahan"
                    className="basis-3/5"
                    
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="City" className="basis-2/5" />
                  <InputText placeholder="Enter city" className="basis-3/5" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Kecamatan" className="basis-2/5" />
                  <InputText
                    placeholder="Enter kecamatan"
                    className="basis-3/5"
                    
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Zip Code" className="basis-2/5" />
                  <InputText placeholder="Enter ZIP code" className="basis-3/5" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Province" className="basis-2/5" />
                  <InputText
                    placeholder="Enter province"
                    className="basis-3/5"
                    
                  />
                </div>
              </div>
            </>
          ),
        },
        {
          name: "Family",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Marrital Status" className="basis-2/5" />
                  <Select
                    placeholder="Choose marrital status"
                    options={[
                      { label: "Single", value: "single" },
                      { label: "Married", value: "married" },
                      { label: "Divorce", value: "divorce" },
                    ]}
                    onChange={(value) => setMarritalStatus(value)}
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
              </div>
              {marritalStatus == "married" || marritalStatus == "divorce" ? 
              <>
                <div className="flex gap-[18px] 2xl:gap-6 items-center">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="Number of Children" className="basis-2/5" />
                    <InputText placeholder="Enter number of children" className="basis-3/5" />
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  </div>
                </div>
                {marritalStatus == "married" ? 
              <>
                <div className="flex gap-[18px] 2xl:gap-6 items-center">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="Spouse Name" className="basis-2/5" />
                    <InputText placeholder="Enter spouse name" className="basis-3/5" />
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="Address" className="basis-2/5" />
                    <InputText
                      placeholder="Enter address"
                      className="basis-3/5"
                    />
                  </div>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="Spouse's Phone" className="basis-2/5" />
                    <InputText placeholder="Enter phone number" className="basis-3/5" />
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  </div>
                </div>
              </>
              :
              null
              }
              </>
              :
              null
              }
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="Mother Name" className="basis-2/5" />
                    <InputText placeholder="Enter mother name" className="basis-3/5" />
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="Address" className="basis-2/5" />
                    <InputText
                      placeholder="Enter address"
                      className="basis-3/5"
                    />
                  </div>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="Mother's Phone" className="basis-2/5" />
                    <InputText placeholder="Enter phone number" className="basis-3/5" />
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  </div>
                </div>
                <hr></hr>
                <div className="flex gap-[18px] 2xl:gap-6 items-center">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="Father Name" className="basis-2/5" />
                    <InputText placeholder="Enter father name" className="basis-3/5" />
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="Address" className="basis-2/5" />
                    <InputText
                      placeholder="Enter address"
                      className="basis-3/5"
                    />
                  </div>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="Father's Phone" className="basis-2/5" />
                    <InputText placeholder="Enter father number" className="basis-3/5" />
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  </div>
                </div>
                <hr></hr>
                <div className="flex gap-[18px] 2xl:gap-6 items-center">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="No. of Siblings" className="basis-2/5" />
                    <div className="basis-3/5 flex gap-2 items-center select-none">
                      <DashCircle className="text-primary cursor-pointer" onClick={() => setSiblings(siblings.slice(0, -1))}/>
                      <h1>{siblings.length}</h1>
                      <PlusCircle className="text-primary cursor-pointer" onClick={() => setSiblings([...siblings, siblings.length = siblings.length+1])}/>
                    </div>
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="Tanggungan" className="basis-2/5" />
                    <InputText placeholder="Enter jumlah tanggungan" className="basis-3/5" />
                  </div>
                </div>
                {siblings.map((item, index) => 
                  <>
                    <div className="flex gap-[18px] 2xl:gap-6 items-center">
                      <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                        <Label name={`Sibling ${index+1} Name`} className="basis-2/5" />
                        <InputText placeholder="Enter father name" className="basis-3/5" />
                      </div>
                      <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                        <Label name="Address" className="basis-2/5" />
                        <InputText
                          placeholder="Enter address"
                          className="basis-3/5"
                        />
                      </div>
                    </div>
                    <div className="flex gap-[18px] 2xl:gap-6 items-center">
                      <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                        <Label name={`Sibling ${index+1} Phone`} className="basis-2/5" />
                        <InputText placeholder="Enter father number" className="basis-3/5" />
                      </div>
                      <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                      </div>
                    </div>
                    {index < siblings.length-1 && <hr></hr>}
                  </>
                )}
            </>
          ),
        },
        {
          name: "Other",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Leave" className="basis-2/5" />
                  <InputText placeholder="Enter total leave" className="basis-3/5" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
              </div>
            </>
          ),
        },        
      ]}
    />
  );
}
