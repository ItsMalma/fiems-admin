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

export default function MasterPort() {

  const {setModal} = useModal(); 
  const {setIndex} = useMenu();

  React.useEffect(() => {
    setIndex(1, 2, 0);
  }, []);

  return (
    <MainLayout>
        <div className='flex flex-col gap-4 h-full'>
            <div className="py-4 px-5 flex justify-between bg-white rounded-2xl shadow-sm">
                <Search placeholder='Search Port Code'/>
                <div className='flex gap-4'>
                    <Button 
                        text='Add New Port' 
                        icon={<FontAwesomeIcon icon={["fas", "building"]}/>} 
                        variant='filled'
                        onClick={() => setModal(
                            <Modal className='w-1/4' title="Add New Port" type="save" onDone={() => {}}>
                                <form className='flex flex-col gap-3'>
                                    <div className='flex items-center gap-4'>
                                        <Label className='basis-1/3' name='Create Date'/>
                                        <InputText className='basis-2/3' disabled value="20/08/2023"/>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <Label className='basis-1/3' name='Port Code'/>
                                        <InputText className='basis-2/3' disabled value="PC00001"/>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <Label className='basis-1/3' name='City'/>
                                        <InputText className='basis-2/3' value="" placeholder='Enter city'/>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <Label className='basis-1/3' name='Province'/>
                                        <InputText className='basis-2/3' value="" placeholder='Enter province'/>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <Label className='basis-1/3' name='Port Name'/>
                                        <InputText className='basis-2/3' value="" placeholder='Port Name'/>
                                    </div>
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
                        {type: "link", name: "Port Code", isSortable: true},
                        {type: "text", name: "Province", isSortable: true},
                        {type: "text", name: "City", isSortable: true},
                        {type: "text", name: "Port Name"},
                    ]}
                    records={[
                        [false, new Date(), "PC00001", "Banten", "Tangerang","Port Name"],
                        [false, new Date(), "PC00001", "Banten", "Tangerang","Port Name"],
                        [false, new Date(), "PC00001", "Banten", "Tangerang","Port Name"],
                        [false, new Date(), "PC00001", "Banten", "Tangerang","Port Name"],
                        [false, new Date(), "PC00001", "Banten", "Tangerang","Port Name"],
                        [false, new Date(), "PC00001", "Banten", "Tangerang","Port Name"],
                        [false, new Date(), "PC00001", "Banten", "Tangerang","Port Name"],
                        [false, new Date(), "PC00001", "Banten", "Tangerang","Port Name"],
                        [false, new Date(), "PC00001", "Banten", "Tangerang","Port Name"],
                        [false, new Date(), "PC00001", "Banten", "Tangerang","Port Name"]
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