import Button from '@/components/Elements/Button'
import InputText from '@/components/Elements/InputText'
import Label from '@/components/Elements/Label'
import Modal from '@/components/Elements/Modal'
import Search from '@/components/Elements/Search'
import Select from '@/components/Elements/Select'
import Table from '@/components/Elements/Table'
import VerticalLine from '@/components/Icons/VerticalLine'
import MainLayout from '@/components/Layouts/MainLayout'
import useMenu from '@/stores/menu'
import useModal from '@/stores/modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function MasterSales() {

  const {setModal} = useModal(); 
  const {setIndex} = useMenu();

  React.useEffect(() => {
    setIndex(1, 3, 0);
  }, []);

  return (
    <MainLayout>
        <div className='flex flex-col gap-4 h-full'>
            <div className="py-4 px-5 flex justify-between bg-white rounded-2xl shadow-sm">
                <Search placeholder='Search Route Code'/>
                <div className='flex gap-4'>
                    <Button 
                        text='Add New Route' 
                        icon={<FontAwesomeIcon icon={["fas", "route"]}/>} 
                        variant='filled'
                        onClick={() => {}}
                        />
                    <Button text='Import' icon={<FontAwesomeIcon icon={["fas", "file-arrow-down"]}/>} variant='outlined'/>
                    <Button text='Export' icon={<FontAwesomeIcon icon={["fas", "file-arrow-up"]}/>} variant='outlined'/>
                </div>
            </div>
            <div className="flex flex-col p-4 bg-white rounded-2xl shadow-sm gap-4 grow">
                <div className='flex justify-between'>
                <div className="flex items-center">
            <Button
              text="Edit"
              icon={<FontAwesomeIcon icon={["fas", "pencil"]} />}
              iconPosition="left"
              variant="normal"
              className="!border-gray-300 !text-gray-300"
            />
            <VerticalLine />
            <Button
              text="Delete"
              icon={<FontAwesomeIcon icon={["fas", "trash"]} />}
              iconPosition="left"
              variant="normal"
              className="!border-gray-300 !text-gray-300"
            />
          </div>
                    <div className='flex gap-4'>
                        <Select 
                            icon={<FontAwesomeIcon icon={["fas", "calendar"]}/>}
                            placeholder='Date Range'
                            options={["Today", "Yesterday", "Weeks Ago"]}
                            value={0}
                            onChange={() => {}}
                        />
                        <Select 
                            icon={<FontAwesomeIcon icon={["fas", "filter"]}/>}
                            placeholder='Filter'
                            options={["Create", "Group Code", "Group Name", "Description"]}
                            value={0}
                            onChange={() => {}}
                            multi={true}
                        />
                        <Select 
                            options={["Show 10 entries", "Show 25 entries", "Show 50 entries"]}
                            value={0}
                            onChange={() => {}}
                        />
                    </div>
                </div>
                <Table 
                    fields={[
                        {type: "option"},
                        {type: "date", name: "Create Date", isSortable: true},
                        {type: "text", name: "Job Position", isSortable: true},
                        {type: "link", name: "Sales Code", isSortable: true},
                        {type: "text", name: "Sales Name", isSortable: true},
                        {type: "text", name: "NIK", isSortable: true},
                        {type: "text", name: "Cabang", isSortable: true},
                        {type: "text", name: "Phone Number", isSortable: true},
                        {type: "text", name: "Telephone", isSortable: true},
                        {type: "text", name: "Fax", isSortable: true},
                        {type: "text", name: "Email", isSortable: true},
                        {type: "text", name: "Description"},
                    ]}
                    records={[
                        [false, new Date(), "Direktur", "SC00001", "Marketing Name", "NIK", "Cabang", "08123456789", "Telephone", "Fax", "email@email.com"],
                        [false, new Date(), "Marketing", "SC00001", "Marketing Name", "NIK", "Cabang", "08123456789", "Telephone", "Fax", "email@email.com"],
                    ]}
                />
                <div className="flex">
                    <p>Showing 10 entries</p>
                </div>
            </div>
        </div>
    </MainLayout>
  )
}