import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Header() {
  return (
    <header className='bg-primary w-full px-6 py-5 text-2xl text-white flex justify-between sticky top-0 z-50'>
        <div>
            <h1 className='font-bold'>FIEMS</h1>
        </div>
        <h1 className="text-blue-200 font-bold">Master</h1>
        <div className='flex gap-9'>
            <FontAwesomeIcon icon={["far", "moon"]}/>
            <FontAwesomeIcon icon={["far", "bell"]}/>
        </div>
    </header>
  )
}
