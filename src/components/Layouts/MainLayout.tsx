import React from 'react'
import Header from './Header'
import Sider from './Sider'

type MainLayoutProps = {
    children: React.ReactNode
}

export default function MainLayout(props: MainLayoutProps) {
  return (
    <div className='max-h-screen min-h-screen flex flex-col bg-neutral-100'>
        <Header/>
        <div className='p-4 flex flex-grow gap-4'>
            <Sider/>
            <div className='flex-grow'>
                {props.children}
            </div>
        </div>
    </div>
  )
}
