import React from 'react'
import Menu from '../Elements/Menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Sider() {
  return (
    <aside className='bg-primary pt-5 pb-4 px-5 rounded-2xl basis-1/6 sticky'>
        <div className='flex flex-col '>        
        <Menu
        
        items={[
            {name: "Dashboard", icon: <FontAwesomeIcon icon={["fas", "chart-simple"]}/>},
            {name: "Master Data", icon: <FontAwesomeIcon icon={["fas", "database"]}/>, subItems: [
                {name: "Business Partner", subSubItems: [
                    {name: "Customer Group"},
                    {name: "Customers"},
                ]},
                {name: "Master Route"},
                {name: "Master Port"},
                {name: "Master Sales"},
                {name: "Master Vehicle"},
                {name: "Master Vessel"},
                {name: "Master Price", subSubItems: [
                    {name: "Price Factory"},
                    {name: "Price Vendor"},
                    {name: "Price Shipping"},
                ]},
                {name: "Master Uang Jalan"},
                {name: "Master Product Category"},
                {name: "Master Product"},
                {name: "Account COA"},
            ]},
        ]}

        />

    </div>
    </aside>
  )
}
