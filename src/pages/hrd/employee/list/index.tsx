import Button from '@/components/Elements/Button'
import Search from '@/components/Elements/Search'
import Select from '@/components/Elements/Select';
import { useRouter } from 'next/router';
import React from 'react'
import { ChevronRight, Pencil, PersonFillAdd } from 'react-bootstrap-icons'
import Avatar from '@/../public/SampleAvatar.jpeg'
import Radio from '@/components/Elements/Radio';
import clsx from 'clsx';
import Image from 'next/image';
import Label from '@/components/Elements/Label';
import useMenu from '@/stores/menu';
import useHeader from '@/stores/header';

type detailProp = {
  employee: any;
}

type employeeProp = {
  setSelectedEmployee: React.Dispatch<React.SetStateAction<number>>
  selectedEmployee: number | number[];
}

const employees = [
  {id: 23948510, name: "Hadi Yusuf Al-Ghifari", avatar: Avatar},
  {id: 12343221, name: "Imam Fauzi Nugraha", avatar: Avatar },
  {id: 33234142, name: "Ridwan Heriyanto", avatar: Avatar},
  {id: 22334321, name: "Dwi Ardiansyah", avatar: Avatar},
  {id: 22434322, name: "Indriani Nurrochmah", avatar: Avatar},
  {id: 12345678, name: "Heryanto Pangestu", avatar: Avatar },
  {id: 12345432, name: "Carla Pratiwi", avatar: Avatar},
  {id: 11111234, name: "Yunita Oktaviani", avatar: Avatar},
  {id: 22222123, name: "Wani Nurdiyanti", avatar: Avatar },
  {id: 12131372, name: "Darmanto Gunarto", avatar: Avatar},
  {id: 32323141, name: "Ira Lailasari", avatar: Avatar},
  {id: 55514115, name: "Qori Melani", avatar: Avatar},
  {id: 72721133, name: "Malik Iswahyudi", avatar: Avatar},
];

function ListComponent(props: employeeProp) {

  const [filter, setFilter] = React.useState(0);

  return (
    <div className='bg-white flex flex-col gap-4 rounded-3xl p-4 basis-2/6 shadow-md'>
      <div className='flex items-center'>
        <h2 className='font-bold text-xl basis-10/12'>Employee List</h2>
        <Select
          options={[
            { label: "A - Z", value: "a" },
            { label: "Z - A", value: "z" },
          ]}
          defaultValue={{ label: "A - Z", value: "a" }}
          onChange={() => {}}
          className='basis-2/12'
        />
      </div>
      <div className="overflow-y-auto">
        <hr/>
        {employees.map((employee, index) => (
          <div
            key={index}
            onClick={() => props.setSelectedEmployee(index)}
            className={clsx(
              "flex items-center gap-x-2.5 bg-white py-3 px-4 cursor-pointer",
              props.selectedEmployee === index && "!bg-gray-300"
            )}
          >
            <Radio checked={index === props.selectedEmployee} />
            <Image
              src="/SampleAvatar.jpeg"
              alt="Sample Avatar"
              width={0}
              height={0}
              sizes="100vh"
              className="rounded-full w-8 h-8"
            />
            <div className="">
              <h1 className="font-semibold text-black">{employee.name}</h1>
              <p className="text-xs text-gray-500">{employee.id}</p>
            </div>
            <ChevronRight className={clsx("ml-auto hidden", props.selectedEmployee === index && "!block")} width="17"/>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailsTab() {

  return (
    <>
      <div className='flex'>
        <Label name="Full Name" className='basis-2/6'/>
        <h1 className='basis-4/6'>: Hadi Yusuf Al-Ghifari</h1>
      </div>
      <div className='flex'>
        <Label name="Employee ID" className='basis-2/6'/>
        <h1 className='basis-4/6'>: 23948510</h1>
      </div>
      <div className='flex'>
        <Label name="Joining Date" className='basis-2/6'/>
        <h1 className='basis-4/6'>: 17 May 2023</h1>
      </div>
      <div className='flex'>
        <Label name="End Date" className='basis-2/6'/>
        <h1 className='basis-4/6'>: -</h1>
      </div>
      <hr></hr>
      <div className='flex'>
        <Label name="NIK KTP" className='basis-2/6'/>
        <h1 className='basis-4/6'>: 3671070712010012</h1>
      </div>
      <div className='flex'>
        <Label name="NPWP" className='basis-2/6'/>
        <h1 className='basis-4/6'>: -</h1>
      </div>
      <hr></hr>
      <div className='flex'>
        <Label name="Place of Birth" className='basis-2/6'/>
        <h1 className='basis-4/6'>: Bandung</h1>
      </div>
      <div className='flex'>
        <Label name="Date of Birth" className='basis-2/6'/>
        <h1 className='basis-4/6'>: 27 June 1999</h1>
      </div>
      <div className='flex'>
        <Label name="Sex" className='basis-2/6'/>
        <h1 className='basis-4/6'>: Male</h1>
      </div>
      <div className='flex'>
        <Label name="Blood Type" className='basis-2/6'/>
        <h1 className='basis-4/6'>: B</h1>
      </div>
      <div className='flex'>
        <Label name="Religion" className='basis-2/6'/>
        <h1 className='basis-4/6'>: Islam</h1>
      </div>
      <hr></hr>
      <div className='flex'>
        <Label name="Latest Education" className='basis-2/6'/>
        <h1 className='basis-4/6'>: Strata 1</h1>
      </div>
      <div className='flex'>
        <Label name="Year of Graduation" className='basis-2/6'/>
        <h1 className='basis-4/6'>: 2021</h1>
      </div>
    </>
  )
}

function ContactAddressTab() {

  return (
    <>
      <div className='flex'>
        <Label name="Phone Number" className='basis-2/6'/>
        <h1 className='basis-4/6'>: 085161390739</h1>
      </div>
      <div className='flex'>
        <Label name="Email" className='basis-2/6'/>
        <h1 className='basis-4/6'>: hadiyusufalghifari@gamil.com</h1>
      </div>
      <div className='flex'>
        <Label name="Emergency Contact" className='basis-2/6'/>
        <h1 className='basis-4/6'>: 085161362713</h1>
      </div>
      <div className='flex'>
        <Label name="Contact Name" className='basis-2/6'/>
        <h1 className='basis-4/6'>: Dadang</h1>
      </div>
      <hr></hr>
      <div className='flex'>
        <Label name="Address" className='basis-2/6'/>
        <h1 className='basis-4/6'>: Jl. Family No. 27</h1>
      </div>
      <div className='flex'>
        <Label name="Kelurahan" className='basis-2/6'/>
        <h1 className='basis-4/6'>: Tangerang</h1>
      </div>      
      <div className='flex'>
        <Label name="Kecamatan" className='basis-2/6'/>
        <h1 className='basis-4/6'>: Tangerang</h1>
      </div>
      <div className='flex'>
        <Label name="City" className='basis-2/6'/>
        <h1 className='basis-4/6'>: Tangerang</h1>
      </div>      
      <div className='flex'>
        <Label name="Province" className='basis-2/6'/>
        <h1 className='basis-4/6'>: Banten</h1>
      </div>
      <div className='flex'>
        <Label name="Zip code" className='basis-2/6'/>
        <h1 className='basis-4/6'>: 15117</h1>
      </div>      
    </>
  )
}

function FamilyTab() {

  return (
    <>
      <div className='flex'>
        <Label name="Marrital Status" className='basis-2/6'/>
        <h1 className='basis-4/6'>: Single</h1>
      </div>
      <div className='flex'>
        <Label name="Spouse" className='basis-2/6'/>
        <h1 className='basis-4/6'>: -</h1>
      </div>
      <div className='flex'>
        <Label name="Number of Children" className='basis-2/6'/>
        <h1 className='basis-4/6'>: -</h1>
      </div>
      <div className='flex'>
        <Label name="Tanggungan" className='basis-2/6'/>
        <h1 className='basis-4/6'>: 0</h1>
      </div>          
    </>
  )
}

function LeaveTab() {

  return (
    <>
      <div className='flex'>
        <Label name="Leave Remaining" className='basis-2/6'/>
        <h1 className='basis-4/6'>: 12</h1>
      </div>        
    </>
  )
}

function DetailComponent(props: detailProp) {
  const [currentTab, setCurrentTab] = React.useState(0);

  return (
    <div className="flex flex-col bg-white shadow-md px-6 py-4 grow rounded-3xl basis-4/6">
      {/*Employee Status*/}
      <div className="flex flex-col px-5 py-4 gap-y-10">
        <div className="flex items-center">
          <div className="mt-auto flex items-center gap-5">
            <Image
              src={Avatar} alt="Avatar"
              className="rounded-full"
              width="55" height="55"
            />
            <div className="">
              <h1 className="text-lg font-semibold text-black">{props.employee.name}</h1>
              <h1 className="text-sm text-gray-500">{props.employee.id}</h1>
            </div>
          </div>
          <div className="ml-auto">
            <Button
              text='Edit'
              variant='outlined'
              className=''
              icon={<Pencil />}
            />
          </div>
        </div>
        <div className="flex text-gray-800 gap-10 justify-center ">
          <div>
            <div className="flex items-center gap-3 h-[55%]">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <h1 className='font-bold text-[1.5rem] '>Active</h1>
            </div>
            <h4>Employee Status</h4>
          </div>
          <div className='border-x-[3px] px-10'>
            <div className="flex items-center h-[55%]">
              <h1 className='font-bold text-[1.5rem]'>Manager</h1>
            </div>
            <h2>Human Resource</h2>
          </div>
          <div>
            <div className="flex items-center h-[55%]">
              <h1 className='font-bold text-[1.5rem]'>12</h1>
            </div>
            <h2>Leaves Remaining</h2>
          </div>
        </div>
      </div>
      {/*Employee Details*/}
      <div className="flex flex-col gap-y-6 border rounded-2xl px-5 py-2.5 mt-5 shadow-sm overflow-y-auto">
        <div className="flex gap-1.5 2xl:gap-2">
          <Button
            key={0}
            variant="normal"
            text="Employee Details"
            className={clsx(
              "font-normal !text-gray-500 !rounded-none",
              currentTab === 0 &&
                "border-b-[3px] border-b-primaryActive !font-semibold !text-gray-800"
            )}
            onClick={() => setCurrentTab(0)}
          />
          <Button
            key={1}
            variant="normal"
            text="Contact and Address"
            className={clsx(
              "font-normal !text-gray-500 !rounded-none",
              currentTab === 1 &&
                "border-b-[3px] border-b-primaryActive !font-semibold !text-gray-800"
            )}
            onClick={() => setCurrentTab(1)}
          />
          <Button
            key={1}
            variant="normal"
            text="Family"
            className={clsx(
              "font-normal !text-gray-500 !rounded-none",
              currentTab === 2 &&
                "border-b-[3px] border-b-primaryActive !font-semibold !text-gray-800"
            )}
            onClick={() => setCurrentTab(2)}
          />
          <Button
            key={1}
            variant="normal"
            text="Leave"
            className={clsx(
              "font-normal !text-gray-500 !rounded-none",
              currentTab === 3 &&
                "border-b-[3px] border-b-primaryActive !font-semibold !text-gray-800"
            )}
            onClick={() => setCurrentTab(3)}
          />
        </div>
        <div className='flex flex-col gap-[18px] 2xl:gap-6 px-3 pb-4 overflow-y-auto'>
          {currentTab === 0 && <DetailsTab/>}
          {currentTab === 1 && <ContactAddressTab/>}
          {currentTab === 2 && <FamilyTab/>}
          {currentTab === 3 && <LeaveTab/>}
        </div>
      </div>
    </div>
  );
}


export default function index() {
  const router = useRouter();  
  const { setActive } = useMenu();
  const { setTitle } = useHeader();
  React.useEffect(() => {
    setTitle("HRD | Employee");
    setActive(4, 0, 0);
  }, []);

  const [selectedEmployee, setSelectedEmployee] = React.useState(0);

  return (
    <>
      <div className="px-[18px] py-[15px] w-full 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search employee name or id" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Employee"
            icon={<PersonFillAdd />}
            variant="filled"
            onClick={() =>
              router.push("/hrd/employee/list/save")
            }
          />
        </div>
      </div>
      <div className="flex rounded-2xl gap-[18px] 2xl:gap-6 grow overflow-auto pb-1">
          <ListComponent selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee}/>
          <DetailComponent employee={employees[selectedEmployee]}/>
      </div>
    </>
  )
}
