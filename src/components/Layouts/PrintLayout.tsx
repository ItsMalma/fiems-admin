import React from "react";
import Header from "./Header";
import Sider from "./Sider";
import Footer from "./Footer";
import { useRouter } from "next/router";
import Image from "next/image";
import LogoCel from "@/../public/logo-cel.png"
import Button from "../Elements/Button";
import { ArrowLeftCircle, Printer } from "react-bootstrap-icons";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function PrintLayout(props: MainLayoutProps) {
  const router = useRouter();
  return (
    <>
      <div className="relative">
        <header className="print:hidden bg-primary w-full px-6 py-[18px] 2xl:px-8 2xl:py-6 flex items-center justify-between sticky top-0 z-50">
          <div>
            <h1 className="text-white text-[18px] 2xl:text-2xl font-bold">FIEMS</h1>            
          </div>
          <div className="flex gap-4">
            <Button
              className=" !text-white !bg-primary2 !border-primary3"
              text="Back"
              icon={<ArrowLeftCircle size={18}/>}
              variant="outlined"
              onClick={() => router.back()}
            />
            <Button
              className=" !text-white !bg-primary2 !border-primary3"
              text="Print/Export to PDF"
              icon={<Printer size={18}/>}
              variant="outlined"
              onClick={() => window.print()}
            />
          </div>
        </header>
        <div className="px-16 py-10">
          <div className="flex gap-4 justify-center items-center">
            <Image className="w-[10rem]" src={LogoCel} width={0} height={0} alt="logo cel"/>
            <div>
              <h1 className='text-lg text-red-500 font-bold'>PT. CHANDRA EKA JAYA</h1>
              <h1 className="text-green-600 text-sm">Jalan Terusan Kepala Hybrida Blok C No. 17 Komplek Gading Square Kelapa Gading Sukapura, Jakarta Utara 14140</h1>
              <ul className='mt-2 text-sm list-disc list-inside flex flex-col gap-2'>
                <li>TELP. 021-29068517, 29068518, 2906519, 29068520</li>
                <li>021-29068473, 29068479, 29061654</li>
                <li>FAX. 021-29068473, 29068479, 29061654</li>
              </ul>
            </div>
          </div>
          <div className="">
            <hr className='border-t-black border-2 my-8 h-0'/>
          </div>
          {props.children}
        </div>
      </div>
    </>
  );
}
