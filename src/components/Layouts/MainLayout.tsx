import React from "react";
import Header from "./Header";
import Sider from "./Sider";
import Footer from "./Footer";
import { useRouter } from "next/router";
import Image from "next/image";
import LogoCel from "@/../public/logo-cel.png"

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout(props: MainLayoutProps) {
  return (
    <>
      <div className="min-h-screen max-h-screen min-w-full max-w-full bg-neutral-100 flex flex-col overflow-x-hidden">
        <Header />
        <div className="pl-[18px] pr-6 py-3 2xl:pl-6 2xl:pr-8 2xl:py-4 flex gap-6 2xl:gap-8 grow overflow-auto">
          <Sider />
          <div className="basis-4/5 2xl:basis-5/6 flex-grow flex flex-col gap-[18px] 2xl:gap-6 overflow-auto">
            {props.children}
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
