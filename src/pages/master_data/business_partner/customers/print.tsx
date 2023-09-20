import Table from '@/components/Elements/Table'
import PrintProvider from '@/components/Layouts/PrintProvider'
import { useRouter } from 'next/router'
import React from 'react'

export default function print() {
  const router = useRouter();

  return (
    <PrintProvider
      title='Customer'
      number='CUST-00001'
      component={
      <>
      
      </>
      }
    />
  )
}
