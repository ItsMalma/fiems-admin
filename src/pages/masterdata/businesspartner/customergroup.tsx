import Button from '@/components/Elements/Button'
import Modal from '@/components/Elements/Modal'
import Search from '@/components/Elements/Search'
import Select from '@/components/Elements/Select'
import Table from '@/components/Elements/Table'
import MainLayout from '@/components/Layouts/MainLayout'
import useModal from '@/stores/modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function CustomerGroup() {

  const {setModal} = useModal();

  return (
    <MainLayout>
        <div className='flex flex-col gap-4 h-full'>
            <div className="p-4 flex justify-between bg-white rounded-2xl shadow-sm">
                <Search placeholder='Search Group Code'/>
                <div className='flex gap-4'>
                    <Button 
                        text='Add New Group' 
                        icon={<FontAwesomeIcon icon={["fas", "user-plus"]}/>} 
                        variant='filled'
                        onClick={() => setModal(
                            <Modal className='w-1/4' title="Add New Customer Group" type="save" onDone={() => {}}>
                                <form>
                                    
                                </form>
                            </Modal>
                        )}
                        />
                    <Button text='Import' icon={<FontAwesomeIcon icon={["fas", "file-arrow-down"]}/>} variant='outlined'/>
                    <Button text='Export' icon={<FontAwesomeIcon icon={["fas", "file-arrow-up"]}/>} variant='outlined'/>
                </div>
            </div>
            <div className="flex flex-col p-4 bg-white rounded-2xl shadow-sm gap-4 grow">
                <div className='flex justify-between'>
                    <div className='flex gap-4'>
                        <Button text="Edit" variant='outlined' className='!border-gray-300 !text-gray-300'/>
                        <Button text="Delete" variant='outlined' className='!border-gray-300 !text-gray-300'/>
                    </div>
                    <div className='flex gap-4'>
                        <Select 
                            icon={<FontAwesomeIcon icon={["fas", "calendar"]}/>}
                            placeholder='Date Range'
                            options={["Today", "Yesterday", "Weeks Ago"]}
                            value={0}
                        />
                        <Select 
                            icon={<FontAwesomeIcon icon={["fas", "filter"]}/>}
                            placeholder='Filter'
                            options={["Create", "Group Code", "Group Name", "Description"]}
                            value={0}
                            multi={true}
                        />
                        <Select 
                            options={["Show 10 entries", "Show 25 entries", "Show 50 entries"]}
                            value={0}
                        />
                    </div>
                </div>
                <Table 
                    fields={[
                        {type: "option"},
                        {type: "date", name: "Create Date", isSortable: true},
                        {type: "link", name: "Group Code", isSortable: true},
                        {type: "text", name: "Name", isSortable: true},
                        {type: "text", name: "Description"},
                    ]}
                    records={[
                        [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
                        [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
                        [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
                        [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
                        [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
                        [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
                        [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
                        [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
                        [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
                        [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"]
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
