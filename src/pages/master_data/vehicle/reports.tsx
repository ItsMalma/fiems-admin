import Button from '@/components/Elements/Button'
import InputText from '@/components/Elements/InputText'
import Label from '@/components/Elements/Label'
import Modal from '@/components/Elements/Modal'
import Search from '@/components/Elements/Search'
import Select from '@/components/Elements/Select'
import Table from '@/components/Elements/Table'
import VerticalLine from '@/components/Icons/VerticalLine'
import MainLayout from '@/components/Layouts/MainLayout'
import useHeader from '@/stores/header'
import useMenu from '@/stores/menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function MasterVehicle() {
  const {setIndex} = useMenu();
  const { setTitle } = useHeader();

  React.useEffect(() => {
    setTitle("Master Vehicle")
    setIndex(1, 4, 0);
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
                        {type: "text", name: "Vendor Name", isSortable: true},
                        {type: "link", name: "Truck Number", isSortable: true},
                        {type: "text", name: "Merk", isSortable: true},
                        {type: "text", name: "Truck Type", isSortable: true},
                        {type: "text", name: "Mesin Number", isSortable: true},
                        {type: "text", name: "Rangka Number", isSortable: true},
                        {type: "text", name: "Silinder", isSortable: true},
                        {type: "text", name: "Color", isSortable: true},
                        {type: "date", name: "STNK Expired", isSortable: true},
                        {type: "date", name: "Pajak Expired", isSortable: true},
                        {type: "date", name: "Keur Expired", isSortable: true},
                        {type: "text", name: "Description"},
                    ]}
                    records={[
                        [false, new Date(), "Vendor Name", "VHC00001", "Merk", "Truck Type", "Mesin Number", "Rangka Number", "Silinder", "Color", new Date(), new Date(), new Date()],
                        [false, new Date(), "Vendor Name", "VHC00001", "Merk", "Truck Type", "Mesin Number", "Rangka Number", "Silinder", "Color", new Date(), new Date(), new Date()],
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