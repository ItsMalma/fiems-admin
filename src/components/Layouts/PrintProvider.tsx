import { useRouter } from 'next/router';
import React from 'react'
import Table from '../Elements/Table';
import ReactToPrint from 'react-to-print';
import Button from '../Elements/Button';

type LayoutProps = {
  onAfterPrint?: void;
  layout?: "table" | "default";
  title: string;
  number?: string;
  printed?: boolean;
  component: React.ReactNode;
};

export default function PrintProvider(props: LayoutProps) {
  const router = useRouter();
  const component = React.useRef(null);

  return (
    <>
      <style jsx global>
        {`
          * {
            font-family: Arial, sans-serif;
          }

        `}
      </style>

      {/* <ReactToPrint trigger={() => <Button variant='outlined' text='Print/Download'/>} content={() => component.current}/> */}
      <div className='flex flex-col justify-center grow m-32'>
      <header className='flex gap-6 justify-center'>
        <div>
          <h1 className='text-2xl text-red-500 font-bold'>PT. CHANDRA EKA JAYA</h1>
          <h1 className="text-green-600">Jalan Terusan Kepala Hybrida Blok C No. 17 Komplek Gading Square Kelapa Gading Sukapura, Jakarta Utara 14140</h1>
          <ul className='mt-2 list-disc list-inside flex flex-col gap-2'>
            <li>TELP. 021-29068517, 29068518, 2906519, 29068520</li>
            <li>021-29068473, 29068479, 29061654</li>
            <li>FAX. 021-29068473, 29068479, 29061654</li>
          </ul>
        </div>
      </header>
      <hr className='border-t-black border-2 mt-12 mb-8'></hr>
      <div className='text-center'>
        <h1 className='text-2xl font-bold'>{props.title}</h1>
        {props.number ? 
          <h3 className='text-lg font-bold'>Number : {props.number}</h3>
        :
         null
        }
      </div>
        {props.component}
      </div>
    </>
  )
}
